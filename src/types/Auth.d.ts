import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role:
      | "ADMIN"
      | "SUBADMIN"
      | "DAERAH"
      | "SUBDAERAH"
      | "DESA"
      | "SUBDESA"
      | "KELOMPOK"
      | "SUBKELOMPOK";
    fullName?: string;
    email?: string;
    accessToken?: string;
  }

  interface Session {
    accessToken?: string;
    user?: {
      id: string;
      role:
        | "ADMIN"
        | "SUBADMIN"
        | "DAERAH"
        | "SUBDAERAH"
        | "DESA"
        | "SUBDESA"
        | "KELOMPOK"
        | "SUBKELOMPOK";
      fullName?: string;
      email?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    role?:
      | "ADMIN"
      | "DAERAH"
      | "SUBDAERAH"
      | "DESA"
      | "SUBDESA"
      | "KELOMPOK"
      | "SUBKELOMPOK";
    user?: {
      id: string;
      role:
        | "ADMIN"
        | "DAERAH"
        | "SUBDAERAH"
        | "DESA"
        | "SUBDESA"
        | "KELOMPOK"
        | "SUBKELOMPOK";
      fullName?: string;
      email?: string;
    };
  }
}
