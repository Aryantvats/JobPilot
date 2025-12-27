export type FloatingCard = {
  bgColor: string;
  iconColor: string;
  textColor: string;
  contentColor: string;
  icon: string;
  title: string;
  content: string;
};

export const floatingCards: Record<string, FloatingCard> = {
  "App.jsx": {
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
    textColor: "text-blue-200",
    contentColor: "text-blue-300",
    icon: "✨",
    title: "AI Assist",
    content: "Generate personalized referral messages instantly with AI.",
  },
};
