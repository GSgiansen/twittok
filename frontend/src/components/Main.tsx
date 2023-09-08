import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import Home from "./home/Home";
import Feed from "./Feed";

interface HomeProps {}

const Main: FC<HomeProps> = () => {
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
        </TabsList>
        <TabsContent value="home">
          <Home />
        </TabsContent>
        <TabsContent value="feed">
          <Feed />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Main;
