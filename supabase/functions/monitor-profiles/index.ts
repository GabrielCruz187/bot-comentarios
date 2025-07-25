import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user's active profiles
    const { data: profiles, error: profilesError } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active');

    if (profilesError) {
      console.error('Error fetching profiles:', profilesError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch profiles' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get user's keywords
    const { data: keywords, error: keywordsError } = await supabaseClient
      .from('keywords')
      .select('*')
      .eq('user_id', user.id);

    if (keywordsError) {
      console.error('Error fetching keywords:', keywordsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch keywords' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Simulate profile monitoring (in a real implementation, this would integrate with social media APIs)
    const mockActivity = profiles.map(profile => ({
      profile_id: profile.id,
      profile_name: profile.name,
      platform: profile.platform,
      new_posts: Math.floor(Math.random() * 5),
      engagement_rate: Math.random() * 100,
      last_activity: new Date().toISOString(),
      keyword_matches: keywords.filter(() => Math.random() > 0.7).map(k => k.keyword)
    }));

    // Update profile activity (in real implementation, this would be actual API data)
    for (const activity of mockActivity) {
      if (activity.new_posts > 0) {
        // Create mock comments for demonstration
        const mockComments = Array.from({ length: activity.new_posts }, (_, i) => ({
          user_id: user.id,
          profile_id: activity.profile_id,
          content: `Comentário automático ${i + 1} baseado nas palavras-chave: ${activity.keyword_matches.join(', ')}`,
          post_url: `https://${activity.platform}.com/post/${Date.now()}-${i}`,
          status: 'pending'
        }));

        const { error: insertError } = await supabaseClient
          .from('comments')
          .insert(mockComments);

        if (insertError) {
          console.error('Error inserting comments:', insertError);
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        monitored_profiles: profiles.length,
        activity_summary: mockActivity,
        message: 'Profile monitoring completed successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in monitor-profiles function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});