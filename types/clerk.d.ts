export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      onboardingComplete?: boolean; // this is a custom claim to check if the user has completed onboarding
      plan?: "agent" | "free";
    };
  }
}
