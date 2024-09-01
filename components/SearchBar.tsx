"use client";
import { FormEvent, useState } from "react";
import { scraper } from "@/server/actions/index";
import { toast } from "react-toastify";
import { Button } from "./ui/button";

export const Search = () => {
  const [search, setSearch] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const includedHostnames = ["www.amazon.in", "amazon.in", "amazon"];
  const urlValidator = (url: string) => {
    try {
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      return includedHostnames.includes(hostname);
    } catch {
      return false;
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pass = urlValidator(search);
    pass ? toast.success("Valid URL") : toast.error("Invalid URL");
    try {
      setLoading(true);
      const product = await scraper(search);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-wrap gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Look Up"
        className="flex p-2 md:p-4 rounded-lg shadow-xs text-base text-gray-500 focus:outline-none"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button
        type="submit"
        className="bg-zinc-900 rounded-lg shadow-xs px-5 font-semibold hover:opacity-90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 py-2 md:py-4 text-white text-base"
        disabled={loading}
      >
        {loading ? "Loading..." : "Search"}
      </Button>
    </form>
  );
};
