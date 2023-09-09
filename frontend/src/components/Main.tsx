import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, useEffect } from "react";
import Home from "./home/Home";
import Feed from "./Feed";
import supabase from "@/supabaseClient";
import Listings from "./Listings";

interface HomeProps {}

const Main: FC<HomeProps> = (session) => {

  //load the user email from the session
  const userEmail = session.session.user.email;


  return (
    <div className="flex flex-col min-h-screen gap-4">
      <Input />
      <Tabs defaultValue="home">
        <TabsList className="w-full">
          <TabsTrigger className="w-1/2" value="home">
            Home
          </TabsTrigger>
          <TabsTrigger className="w-1/2" value="feed">
            Feed
          </TabsTrigger>
          <TabsTrigger className="w-1/2" value="listing">
            Listings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="home">
          <Home />
        </TabsContent>
        <TabsContent value="feed">
          <Feed session={session}/>
        </TabsContent>
        <TabsContent value="listing">
          <Listings session={session}/>
        </TabsContent>
      </Tabs>
      <div>
        <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Main;
