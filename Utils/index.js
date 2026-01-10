
export const shortenAddress = (address) =>
  `${address?.slice(0, 6)}...${address?.slice(address.length - 4)}`;

export const parseErrorMsg = (e) => {
  const json = JSON.parse(JSON.stringify(e));
  return json?.reason || json?.error?.message;
};

export const isValidTwitterUrl = (url) => {
  const regex = /^https?:\/\/(www\.)?(twitter|x)\.com\/\w+\/status\/\d+/;
  return regex.test(url);
};

export const isValidLinkedInUrl = (url) => {
  // Simple check for domain, as post formats vary
  return url.includes("linkedin.com");
};

export const getTwitterIdFromUrl = (url) => {
  try {
    if (!url.includes("status/")) return url; // Assume it's an ID if no status/ part
    const parts = url.split("status/");
    if (parts.length > 1) {
      // Remove any query parameters
      return parts[1].split("?")[0].split("/")[0];
    }
  } catch (e) {
    console.error(e);
  }
  return "";
};

