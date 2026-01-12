const linkedin = ({ handleClick, user }) => {
  const getEmbedUrl = (url) => {
    if (!url) return null;

    // Extract ID patterns
    const ugcMatch = url.match(/ugcPost-(\d+)/);
    if (ugcMatch) return `https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:${ugcMatch[1]}`;

    const activityMatch = url.match(/activity-(\d+)/);
    if (activityMatch) return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${activityMatch[1]}`;

    // Handle share update pattern
    const shareMatch = url.match(/urn:li:share:(\d+)/);
    if (shareMatch) return `https://www.linkedin.com/embed/feed/update/urn:li:share:${shareMatch[1]}`;

    return null;
  };

  const embedSrc = getEmbedUrl(user.linkedInUrl);
  const isValidUrl = /linkedin\.com\/(feed\/update\/|posts\/|activity\/)/.test(user.linkedInUrl);

  return (
    <>
      <div class="input-group-new">
        <label class="label-new">Post Url</label>
        <input
          onChange={handleClick}
          class="input-new"
          type="text"
          value={user.linkedInUrl || ''}
          placeholder="Paste LinkedIn Post URL"
        />
        <div></div>
      </div>

      {user.linkedInUrl && isValidUrl && embedSrc && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: '1rem' }}>
          <iframe
            src={embedSrc}
            height="424"
            width="325"
            frameBorder="0"
            allowFullScreen=""
            title="Embedded post"
            style={{ borderRadius: '8px', border: '1px solid #e0e0e0' }}
          ></iframe>
        </div>
      )}
    </>
  );
};

export default linkedin;
