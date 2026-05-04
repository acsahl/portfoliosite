export default async (req, context) => {
  const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN } = process.env

  if (!STRAVA_CLIENT_ID || !STRAVA_CLIENT_SECRET || !STRAVA_REFRESH_TOKEN) {
    return new Response(JSON.stringify({ error: 'Strava env vars not set' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    // Refresh the access token
    const tokenRes = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: STRAVA_CLIENT_ID,
        client_secret: STRAVA_CLIENT_SECRET,
        refresh_token: STRAVA_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    })
    const tokenData = await tokenRes.json()

    if (!tokenData.access_token) {
      return new Response(JSON.stringify({ error: 'Failed to refresh token', detail: tokenData }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Fetch recent activities
    const activitiesRes = await fetch(
      'https://www.strava.com/api/v3/athlete/activities?per_page=10',
      { headers: { Authorization: `Bearer ${tokenData.access_token}` } }
    )
    const activities = await activitiesRes.json()

    // Filter to runs only and return top 5
    const runs = activities
      .filter(a => a.type === 'Run')
      .slice(0, 5)
      .map(a => ({
        id: a.id,
        name: a.name,
        distance: a.distance,          // meters
        moving_time: a.moving_time,    // seconds
        elapsed_time: a.elapsed_time,
        start_date: a.start_date_local,
        total_elevation_gain: a.total_elevation_gain,
        average_heartrate: a.average_heartrate,
        url: `https://www.strava.com/activities/${a.id}`,
      }))

    return new Response(JSON.stringify(runs), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=3600',
      },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config = { path: '/api/strava' }
