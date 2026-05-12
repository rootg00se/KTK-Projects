import React from "react";
import { Tabs, TabsContent } from "@/shared/components";
import { ProfileTabs } from "@/widgets/profile-tabs";
import { useTabsUrlQuery } from "@/shared/hooks/useTabsUrlQuery";
import { UserProjectsList } from "@/widgets/user-projects-list";
import { QuestionsList } from "@/widgets/questions-list";
import { ProfileInfo } from "@/widgets/profile-info";

export const ProfilePage: React.FC = () => {
    const { activateTab, handleTabChange } = useTabsUrlQuery("tab", "projects");

    return (
        <section className="w-full max-lg:flex justify-center">
            <div className="w-full max-w-180">
                <ProfileInfo />
                <Tabs value={activateTab} onValueChange={handleTabChange}>
                    <ProfileTabs />
                    <TabsContent value="projects">
                        <UserProjectsList />
                    </TabsContent>
                    <TabsContent value="questions">
                        <QuestionsList />
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
};
