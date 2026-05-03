import React from "react";
import { TabsContent } from "@/shared/components/ui";
import { useTabsUrlQuery } from "@/shared/hooks/useTabsUrlQuery";
import { Tabs } from "@/shared/components/ui";
import { WorkspaceHeader } from "@/widgets/workspace-header";
import { WorkspaceTabs } from "@/widgets/workspace-tabs";
import { WorkspaceInfo } from "@/widgets/workspace-info";
import { WorkspaceSettings } from "@/widgets/workspace-settings";
import { WorkspaceTrackers } from "@/widgets/workspace-trackers";


export const ProjectWorkspace: React.FC = () => {
    const { activateTab, handleTabChange } = useTabsUrlQuery("tab", "projects");

    return (
        <div className="bg-white h-screen flex flex-col overflow-hidden">
            <WorkspaceHeader />
            <Tabs value={activateTab} onValueChange={handleTabChange} className="flex-1 flex flex-col overflow-hidden">
                <div className="bg-white pt-2 border-b shrink-0">
                    <WorkspaceTabs />
                </div>
                <TabsContent value="general" className="flex-1 overflow-y-auto">
                    <WorkspaceInfo />
                </TabsContent>
                <TabsContent value="settings" className="flex-1 overflow-y-auto">
                    <WorkspaceSettings />
                </TabsContent>
                <TabsContent value="tracker" className="flex-1 overflow-hidden items-center mt-0 data-[state=active]:flex flex-col">
                    <WorkspaceTrackers />
                </TabsContent>
            </Tabs>
        </div>
    );
};
