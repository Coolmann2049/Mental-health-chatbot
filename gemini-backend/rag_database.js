// This is a simplified RAG database with dummy documents and random embeddings

const ragDatabase = [
    {
        content: "Remember that feeling overwhelmed is temporary. Take things one step at a time.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "When feeling anxious, try focusing on your breath for a few minutes.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Engage in activities you enjoy, even if you don't feel like it at first.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Talk to a trusted friend or family member about how you're feeling.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Prioritize getting enough sleep, as it significantly impacts your mood.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Make time for regular physical activity, even if it's just a short walk.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Practice gratitude by writing down a few things you're thankful for each day.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Limit your exposure to news and social media if you find it overwhelming.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Try a guided meditation or mindfulness exercise to calm your mind.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Break down large tasks into smaller, more manageable steps.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Remember that it's okay to ask for help when you need it.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Focus on what you can control and try to let go of what you can't.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Spend time in nature, as it can have a positive impact on your mental health.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Practice self-compassion and be kind to yourself, just as you would to a friend.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "If you're feeling lonely, try reaching out to a support group or online community.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Set realistic goals for yourself and celebrate small achievements.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Learn to say no to commitments that will add unnecessary stress to your life.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Consider journaling your thoughts and feelings as a way to process them.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Listen to calming music or sounds to help you relax.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Find healthy ways to cope with stress, such as exercise or creative expression.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Remember that setbacks are a normal part of life, and you can learn from them.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Practice positive self-talk and challenge negative thoughts.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "If you're struggling, remember that professional help is available and can make a significant difference.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Try to incorporate small moments of joy and pleasure into your daily routine.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Be patient with yourself; healing and growth take time.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "When you feel overwhelmed, try the 4-7-8 breathing technique to calm your nervous system.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Set small, achievable goals for the day to build a sense of accomplishment.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Listen to uplifting music or podcasts that inspire you.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Spend some time in sunlight each day, as it can boost your mood and energy levels.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Practice progressive muscle relaxation to release tension in your body.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Engage your senses in a positive way, like smelling flowers or enjoying a warm drink.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Write a letter to yourself offering encouragement and compassion.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "If you're feeling stuck, try changing your environment or routine.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Remind yourself of your strengths and past accomplishments.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Practice mindful eating by paying attention to the taste and texture of your food.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Connect with your creativity through art, music, writing, or any other outlet.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Volunteer your time to help others; it can boost your sense of purpose.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Create a calming bedtime routine to improve your sleep quality.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Limit caffeine and alcohol intake, as they can affect your mood and anxiety levels.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Plan something enjoyable to look forward to, even if it's small.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Practice forgiveness, both towards yourself and others.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Spend time with pets, as they can provide comfort and reduce stress.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Try to identify your triggers for negative emotions and develop coping strategies.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Engage in activities that make you laugh; humor can be a great stress reliever.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Practice self-acceptance and acknowledge that everyone has flaws and imperfections.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "If you're feeling overwhelmed by your thoughts, try writing them down to gain some perspective.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Set boundaries in your relationships to protect your time and energy.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Explore resources like mental health apps or websites for additional support and information.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Remember that progress isn't always linear; there will be ups and downs.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Celebrate your resilience and the strength you've shown in facing challenges.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Taking deep breaths can help calm your nervous system during moments of stress or anxiety.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Establishing a regular sleep schedule is important for maintaining a stable mood.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Engaging in hobbies and activities you enjoy can provide a sense of pleasure and accomplishment.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Connecting with supportive friends and family can help you feel less alone when facing challenges.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Mindfulness practices, such as focusing on the present moment, can reduce worry about the future or past.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Regular physical activity releases endorphins, which have mood-boosting effects.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Practicing gratitude can shift your focus towards the positive aspects of your life.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Setting realistic and achievable goals can provide a sense of direction and purpose.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Learning to manage your time effectively can reduce feelings of being overwhelmed.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Seeking professional help from a therapist or counselor is a sign of strength and can provide valuable support.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Eating a balanced and nutritious diet can have a positive impact on your mental and emotional well-being.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Spending time in nature has been shown to reduce stress and improve mood.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Practicing self-compassion involves treating yourself with the same kindness and understanding you would offer a friend.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Finding healthy ways to cope with stress, such as listening to music or spending time on hobbies, is important.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Challenging negative thought patterns and replacing them with more positive ones can improve your outlook.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Establishing healthy boundaries in your relationships can protect your emotional energy.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Volunteering or helping others can provide a sense of purpose and connection.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Learning relaxation techniques, such as progressive muscle relaxation, can help reduce physical tension.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Reflecting on your strengths and accomplishments can boost your self-esteem.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Creating a calming bedtime routine can signal to your body that it's time to rest.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Limiting your intake of caffeine and alcohol can help stabilize your mood and reduce anxiety.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Planning enjoyable activities to look forward to can provide a sense of hope and motivation.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Practicing forgiveness, both for yourself and others, can release negative emotions.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Spending quality time with loved ones strengthens your support network.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    },
    {
        content: "Remember that it's okay to have bad days, and these feelings will eventually pass.",
        embedding: Array.from({ length: 10 }, () => Math.random())
    }
];

module.exports = ragDatabase;