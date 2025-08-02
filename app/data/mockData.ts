import { ProblemAnalysis } from '../types';

export const mockTopicSuggestions = [
  'Climate Change and Renewable Energy',
  'Artificial Intelligence Ethics',
  'Global Economic Inequality',
  'Cybersecurity Threats',
  'Mental Health in Digital Age',
  'Sustainable Urban Development',
  'Digital Privacy Rights',
  'Education Technology Revolution',
  'Healthcare Access Worldwide',
  'Social Media Impact on Society'
];

export const mockRandomTopics = [
  'Climate Change and Renewable Energy',
  'Artificial Intelligence Ethics',
  'Global Economic Inequality',
  'Cybersecurity Threats',
  'Mental Health in Digital Age',
  'Sustainable Urban Development',
  'Digital Privacy Rights',
  'Education Technology Revolution',
  'Healthcare Access Worldwide',
  'Social Media Impact on Society',
  'Space Exploration and Colonization',
  'Quantum Computing Breakthroughs',
  'Renewable Energy Storage Solutions',
  'Genetic Engineering Ethics',
  'Global Water Scarcity'
];

export const mockAnalysisData: Record<string, ProblemAnalysis> = {
  'Climate Change and Renewable Energy': {
    topic: 'Climate Change and Renewable Energy',
    summary: 'Climate change represents one of the most pressing challenges of our time, with global temperatures rising and extreme weather events becoming more frequent. The transition to renewable energy sources like solar, wind, and hydroelectric power offers a sustainable solution to reduce greenhouse gas emissions and combat climate change.',
    aggregatedProblem: 'The world faces an urgent climate crisis with rising global temperatures, melting ice caps, and increasing extreme weather events. Fossil fuel dependency continues to drive carbon emissions, while the transition to renewable energy faces economic, political, and infrastructural barriers.',
    solutionProposal: 'Implement comprehensive renewable energy policies including carbon pricing, renewable energy subsidies, and grid modernization. Invest in research and development for energy storage technologies. Establish international cooperation for clean energy standards and technology sharing.',
    proposingViewpoint: 'Renewable energy is the most viable solution to climate change. Solar and wind power have become cost-competitive with fossil fuels. The transition will create millions of jobs and improve public health. Government policies and incentives are essential to accelerate adoption.',
    opposingViewpoint: 'Renewable energy is unreliable and requires backup fossil fuel plants. The transition is too expensive and will harm the economy. Developing countries cannot afford renewable energy. Nuclear power is a better solution than renewables.',
    historicalPerspective: 'The Industrial Revolution marked the beginning of large-scale fossil fuel use. The 1970s oil crisis first highlighted energy security concerns. The 1997 Kyoto Protocol established international climate commitments. The 2015 Paris Agreement set ambitious global temperature targets.',
    motivationalProverb: 'The best time to plant a tree was 20 years ago. The second best time is now.'
  },
  'Artificial Intelligence Ethics': {
    topic: 'Artificial Intelligence Ethics',
    summary: 'As artificial intelligence becomes increasingly integrated into our daily lives, questions about ethics, bias, privacy, and accountability have become paramount. The development of AI systems that are fair, transparent, and beneficial to society requires careful consideration of ethical principles and regulatory frameworks.',
    aggregatedProblem: 'AI systems can perpetuate and amplify existing biases, leading to discriminatory outcomes. Lack of transparency in AI decision-making processes creates accountability challenges. Privacy concerns arise from AI systems collecting and processing vast amounts of personal data.',
    solutionProposal: 'Implement comprehensive AI ethics guidelines and regulatory frameworks. Ensure diverse representation in AI development teams. Require transparency and explainability in AI systems. Establish independent oversight bodies for AI deployment.',
    proposingViewpoint: 'AI has the potential to solve complex problems and improve human lives. With proper ethical guidelines and oversight, AI can be developed responsibly. The benefits of AI outweigh the risks when properly managed.',
    opposingViewpoint: 'AI poses existential threats to humanity and should be heavily restricted. Current AI systems are too biased and unreliable for widespread use. The rapid development of AI is outpacing our ability to regulate it effectively.',
    historicalPerspective: 'The field of AI ethics emerged in the 1950s with Isaac Asimov\'s Three Laws of Robotics. The 2010s saw increased focus on algorithmic bias and fairness. Recent years have brought concerns about AI safety and alignment.',
    motivationalProverb: 'With great power comes great responsibility.'
  },
  'Global Economic Inequality': {
    topic: 'Global Economic Inequality',
    summary: 'Economic inequality has reached unprecedented levels globally, with the wealthiest 1% controlling a disproportionate share of global wealth. This inequality affects access to education, healthcare, and opportunities, creating social tensions and economic instability.',
    aggregatedProblem: 'The gap between the richest and poorest continues to widen, with the top 1% controlling over 40% of global wealth. This inequality limits social mobility, reduces economic growth, and increases social tensions. Tax systems often favor the wealthy.',
    solutionProposal: 'Implement progressive tax reforms and close tax loopholes. Increase investment in education and healthcare for disadvantaged communities. Establish living wage policies and strengthen labor rights. Promote inclusive economic growth policies.',
    proposingViewpoint: 'Reducing inequality is essential for social stability and economic growth. Progressive taxation and social programs can reduce inequality without harming economic growth. Government intervention is necessary to address market failures.',
    opposingViewpoint: 'Inequality is a natural result of market forces and individual choices. Redistributive policies discourage innovation and economic growth. The wealthy create jobs and opportunities for others. Government intervention distorts markets.',
    historicalPerspective: 'The Industrial Revolution created new forms of economic inequality. The Great Depression led to increased government intervention. The post-war period saw reduced inequality in many countries. Globalization has increased inequality since the 1980s.',
    motivationalProverb: 'A rising tide lifts all boats.'
  },
  'Cybersecurity Threats': {
    topic: 'Cybersecurity Threats',
    summary: 'Cybersecurity threats have evolved from simple viruses to sophisticated attacks targeting governments, businesses, and individuals. The increasing digitization of society has created new vulnerabilities, while cybercriminals and state actors develop more advanced attack methods.',
    aggregatedProblem: 'Cyber attacks are becoming more frequent, sophisticated, and damaging. Critical infrastructure, healthcare systems, and financial institutions are vulnerable. The shortage of cybersecurity professionals exacerbates the problem. International cooperation on cybercrime is limited.',
    solutionProposal: 'Increase investment in cybersecurity education and training. Implement stronger security standards and regulations. Enhance international cooperation on cybercrime. Develop more secure technologies and encryption methods.',
    proposingViewpoint: 'Cybersecurity is a national security priority requiring government intervention. Stronger regulations and standards are necessary to protect critical infrastructure. International cooperation is essential to combat cybercrime.',
    opposingViewpoint: 'Market forces will drive better cybersecurity solutions. Government regulation stifles innovation and creates compliance burdens. Private companies should be responsible for their own security. International cooperation is too difficult to achieve.',
    historicalPerspective: 'The first computer virus appeared in the 1980s. The 1990s saw the rise of internet-based attacks. The 2000s brought sophisticated state-sponsored attacks. Recent years have seen ransomware and supply chain attacks.',
    motivationalProverb: 'An ounce of prevention is worth a pound of cure.'
  },
  'Mental Health in Digital Age': {
    topic: 'Mental Health in Digital Age',
    summary: 'The digital age has transformed how we live, work, and socialize, but it has also introduced new challenges for mental health. Social media, constant connectivity, and digital stress are affecting well-being, particularly among young people.',
    aggregatedProblem: 'Social media use is linked to increased rates of anxiety, depression, and loneliness. Constant digital connectivity creates stress and burnout. Cyberbullying and online harassment affect mental health. Digital addiction is becoming more common.',
    solutionProposal: 'Implement digital wellness programs in schools and workplaces. Develop tools for managing screen time and social media use. Increase access to mental health services. Promote digital literacy and healthy online habits.',
    proposingViewpoint: 'Digital technologies can both harm and help mental health. With proper education and tools, people can use technology healthily. Mental health services should be more accessible and affordable.',
    opposingViewpoint: 'Digital technologies are inherently harmful to mental health. Social media should be more heavily regulated. People should disconnect from technology more often. The mental health crisis is overblown.',
    historicalPerspective: 'The internet became widely available in the 1990s. Social media emerged in the 2000s. Smartphone adoption accelerated in the 2010s. The COVID-19 pandemic increased digital dependency.',
    motivationalProverb: 'Balance is the key to everything.'
  }
};

// Generate mock data for any topic not in the predefined list
export const generateMockAnalysis = (topic: string): ProblemAnalysis => {
  const randomTopics = mockRandomTopics.filter(t => t !== topic);
  const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
  const baseAnalysis = mockAnalysisData[randomTopic] || mockAnalysisData['Climate Change and Renewable Energy'];
  
  return {
    ...baseAnalysis,
    topic: topic,
    summary: baseAnalysis.summary.replace(baseAnalysis.topic, topic),
    aggregatedProblem: baseAnalysis.aggregatedProblem.replace(baseAnalysis.topic, topic),
    solutionProposal: baseAnalysis.solutionProposal.replace(baseAnalysis.topic, topic),
    proposingViewpoint: baseAnalysis.proposingViewpoint.replace(baseAnalysis.topic, topic),
    opposingViewpoint: baseAnalysis.opposingViewpoint.replace(baseAnalysis.topic, topic),
    historicalPerspective: baseAnalysis.historicalPerspective.replace(baseAnalysis.topic, topic)
  };
};

// Simulate API delay
export const simulateApiDelay = (minDelay = 500, maxDelay = 2000): Promise<void> => {
  const delay = Math.random() * (maxDelay - minDelay) + minDelay;
  return new Promise(resolve => setTimeout(resolve, delay));
}; 