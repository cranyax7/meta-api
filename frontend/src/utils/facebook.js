export const initFacebookSDK = () => {

  // Load the Facebook SDK asynchronously and intialize with your App ID
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: import.meta.env.VITE_FACEBOOK_APP_ID, // Facebook App ID
      cookie: true, // Enable cookies for session management
      xfbml: true, // Parse social plugins on the page
      version: 'v22.0', // Use a valid Graph API version
    });
    window.FB.AppEvents.logPageView(); // Log page view event
  };
};

export const fetchPageInsights = async (pageId, accessToken, since, until) => {
  if (!window.FB) {
    console.error('Facebook SDK not loaded');
    return null;
  }

    // https://graph.facebook.com/{page_id}?fields=insights.metric(page_fans)&access_token={access_token}

    // https://graph.facebook.com/577971935396853?fields=insights.metric(page_fans,page_engaged_users,page_impressions,page_post_engagements)&access_token=EAGURyae9lnMBOxFomHeUcDGMbuwrKFwyAel9QF76ZAew8EkTqFz3rRCsfZBQIZAZBKunZA8SY1J6oUD8fLiwMUgxV8pvurb7PoY1hoUd60c0xL3RdBdQxFAQa64zzVjxPbxLj2BamlzSV62TAZBJrLVZBvIM8ZCRnuje4KzlZAZBaCa7fM5q1nFrxFZCBLkVfTGGCEMos1Bd3ZBfebeD2lS765t5BWpF0m3RaNLD

  try {
    const metrics = [
      'page_fans',
      // 'page_engaged_users', // Deprecated
      'page_impressions',
      'page_post_engagements',
    ];

    const url = `https://graph.facebook.com/${pageId}?fields=insights.metric(${metrics.join(',')})&period=total_over_range&since=${since}&until=${until}&access_token=${accessToken}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      console.error('Facebook API Error:', data.error);
      return null;
    }

    console.log('Insights API Response:', data);
    return data.insights?.data || [];
  } catch (error) {
    console.error('Error fetching insights:', error);
    return null;
  }
};
