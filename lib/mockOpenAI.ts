/**
 * Mock OpenAI client for development purposes
 * This allows testing AI features without an actual OpenAI API key
 */

const mockCaptions = {
  professional: [
    "Elevate your productivity with our latest tips and tools. The journey to success is paved with smart work, not just hard work. #ProductivityTips #WorkSmarter",
    "Introducing our newest solution designed specifically for solopreneurs. Streamline your workflow and focus on what truly matters. #SolopreneurLife #BusinessGrowth",
    "Data-driven decisions lead to remarkable results. Discover how our analytics can transform your business strategy. #DataDriven #BusinessStrategy"
  ],
  casual: [
    "Hey there! Just dropped some fresh content on the blog about working smarter, not harder. Check it out! 👀 #WorkLifeBalance #ProductivityHacks",
    "Coffee break confession: sometimes the best ideas come when you're not trying so hard! What's your creative process like? #CreativeProcess #CoffeeThoughts",
    "Friday mood: planning next week's content while dreaming about the weekend! Who else is with me? 🙌 #FridayFeeling #WeekendVibes"
  ],
  humorous: [
    "My coffee told me it's time to conquer the world. Or at least my inbox. Starting with whichever has fewer unread messages! 😂 #MondayMood #EmailOverload",
    "If procrastination was an Olympic sport, I'd be training for it tomorrow. Or maybe the day after. #ProcrastinatorsUnite #SomeDay",
    "Just spent three hours on a task that should've taken 20 minutes. In related news, I'm now an expert in 17 unrelated Wikipedia topics. #ProductivityFail #DownTheRabbitHole"
  ],
  inspirational: [
    "Every setback is setting you up for a comeback. Keep pushing forward, your breakthrough is just around the corner. ✨ #NeverGiveUp #Perseverance",
    "Your journey may be difficult, but the view from the top will be worth it. Believe in yourself and your vision. #DreamBig #BeliefInSelf",
    "Today's efforts become tomorrow's success stories. What small step will you take today toward your biggest goals? #SmallSteps #BigGoals"
  ]
};

const mockOpenAI = {
  chat: {
    completions: {
      create: async (params: any) => {
        // Extract tone from the prompt
        const prompt = params.messages.find((m: any) => m.role === 'user')?.content || '';
        
        let tone = 'professional';
        if (prompt.includes('tone: casual')) tone = 'casual';
        if (prompt.includes('tone: humorous')) tone = 'humorous';
        if (prompt.includes('tone: inspirational')) tone = 'inspirational';
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return {
          choices: [
            {
              message: {
                content: mockCaptions[tone as keyof typeof mockCaptions].join('\n\n')
              }
            }
          ]
        };
      }
    }
  }
};

export default mockOpenAI;
