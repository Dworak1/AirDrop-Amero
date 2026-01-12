import { getXIdFromUrl } from "../../Utils";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ success: false, error: 'URL is required' });
    }

    try {
        // 1. Valid URL and Extract ID (Sanity Check)
        // We reuse the utility logic via regex here to ensure backend independence
        const xIdRegex = /\/status\/(\d+)/;
        const match = url.match(xIdRegex);
        if (!match) {
            return res.status(400).json({ success: false, error: 'Invalid X (Twitter) Post URL' });
        }
        const tweetId = match[1];

        // 2. Fetch Tweet Data (Using oEmbed for Keyless Verification)
        // This allows verification without a paid Twitter API key strictly for public text checking.
        const oembedUrl = `https://publish.twitter.com/oembed?url=${encodeURIComponent(url)}`;
        const response = await fetch(oembedUrl);

        if (!response.ok) {
            if (response.status === 404) {
                return res.status(404).json({ success: false, error: 'Tweet not found or is private' });
            }
            throw new Error('Failed to fetch tweet data');
        }

        const data = await response.json();
        const htmlContent = data.html; // The tweet text is embedded in the HTML blockquote

        // 3. Extract and Normalize Text
        // Remove HTML tags to get raw text
        let cleanText = htmlContent.replace(/<[^>]*>/g, ' ');
        // Normalize: lowercase, collapse whitespace
        cleanText = cleanText.toLowerCase().replace(/\s+/g, ' ').trim();

        // 4. Verification Rules
        const checks = [
            { phrase: "introducing @amerox", label: "Mentioning @AmeroX" },
            { phrase: "the future of decentralized finance", label: "Slogan: Future of DeFi" },
            { phrase: "invest in positive change", label: "Slogan: Invest in Change" },
            { phrase: "#amerox", label: "Hashtag #amerox" },
            { phrase: "#airdrop", label: "Hashtag #airdrop" },
        ];

        const missing = [];

        checks.forEach(check => {
            // We check for the phrase (already normalized to lowercase)
            if (!cleanText.includes(check.phrase)) {
                missing.push(check.label);
            }
        });

        if (missing.length > 0) {
            return res.status(400).json({
                success: false,
                error: `Verification Failed. Missing: ${missing.join(', ')}`,
                debug: { receivedText: cleanText.substring(0, 100) + "..." } // verification hint
            });
        }

        // 5. Success
        return res.status(200).json({
            success: true,
            message: 'Tweet Verified Successfully'
        });

    } catch (error) {
        console.error('Verification Error:', error);
        return res.status(500).json({ success: false, error: 'Internal Server Error during verification' });
    }
}
