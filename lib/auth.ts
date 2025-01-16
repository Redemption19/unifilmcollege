import CredentialsProvider from "next-auth/providers/credentials";

const ADMIN_EMAIL = "admin@unifilm.edu.gh";
const ADMIN_PASSWORD = "UnifilmAdmin123"; // You can change this to any password you want

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        // Simple direct comparison
        const isValid = 
          credentials.email === ADMIN_EMAIL && 
          credentials.password === ADMIN_PASSWORD;

        if (isValid) {
          return {
            id: "1",
            email: ADMIN_EMAIL,
            name: "Admin",
          };
        }

        console.log("Invalid credentials");
        return null;
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
  },
}; 