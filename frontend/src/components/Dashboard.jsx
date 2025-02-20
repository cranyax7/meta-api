import { useState, useEffect } from 'react';
import LoginButton from './LoginButton';
import UserProfile from './UserProfile';
import PageSelector from './PageSelector';
import InsightsCard from './InsightsCard';
import { initFacebookSDK, fetchPageInsights } from '../utils/facebook';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [pages, setPages] = useState([]);
  const [insights, setInsights] = useState(null);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [since, setSince] = useState('');
  const [until, setUntil] = useState('');

  useEffect(() => {
    initFacebookSDK();
  }, []);

  const handleLogin = (response) => {
    setUser(response);
    fetchUserPages(response.accessToken);
  };

  const handleLogout = () => {
    window.FB.logout(() => {
      setUser(null);
      setPages([]);
      setInsights(null);
      setSelectedPageId(null);
    });
  };

  const fetchUserPages = async (accessToken) => {
    try {
      window.FB.api('/me/accounts', { access_token: accessToken }, (response) => {
        if (!response.error && response.data) {
          const pagesWithTokens = response.data.map(page => ({
            id: page.id,
            name: page.name,
            accessToken: page.access_token
          }));
          setPages(pagesWithTokens);
        }
      });
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const handlePageSelect = async (pageId) => {
    setSelectedPageId(pageId);
    if (!since || !until) {
      alert('Please select both "Since" and "Until" dates.');
      return;
    }

    if (new Date(since) > new Date(until)) {
      alert('"Since" date must be before "Until" date.');
      return;
    }

    if (pageId && user) {
      const selectedPage = pages.find(page => page.id === pageId);
      if (selectedPage) {
        const insightsData = await fetchPageInsights(pageId, selectedPage.accessToken, since, until);
        if (insightsData) {
          const insightsMap = insightsData.reduce((acc, item) => {
            acc[item.name] = item.values[0]?.value || 0;
            return acc;
          }, {});

          setInsights(insightsMap);
        }
      }
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Facebook Page Insights</h1>

      {!user ? (
        <div className="text-center">
          <LoginButton onLogin={handleLogin} />
        </div>
      ) : (
        <>
          <div className="mb-6">
            <UserProfile accessToken={user.accessToken} />
            <PageSelector pages={pages} onPageSelect={handlePageSelect} selectedPageId={selectedPageId} />
          </div>

          {insights && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InsightsCard title="Total Followers" value={insights.page_fans || 0} />
              <InsightsCard title="Total Engagement" value={insights.page_engaged_users || 0} />
              <InsightsCard title="Total Impressions" value={insights.page_impressions || 0} />
              <InsightsCard title="Total Reactions" value={insights.page_post_engagements || 0} />
            </div>
          )}

          {user && (
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Date Range:</label>
              <div className="flex flex-col-1 gap-2 sm:flex-row">
                <input type="date" value={since} onChange={(e) => setSince(e.target.value)} className="flex flex-row border p-2 rounded" />
                <input type="date" value={until} onChange={(e) => setUntil(e.target.value)} className="flex flex-row border p-2 rounded" />
              </div>
            </div>
          )}
        <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 mt-4 rounded disabled:opacity-50'>Logout</button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
