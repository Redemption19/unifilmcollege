"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function AdminHeader() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4 sm:px-6">
        <div className="flex flex-1 items-center justify-end">
          <Button 
            variant="outline" 
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
} 