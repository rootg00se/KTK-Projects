import React from "react";
import { TabsContent } from "@/shared/components/ui";
import { useTabsUrlQuery } from "@/shared/hooks/useTabsUrlQuery";
import { Tabs } from "@/shared/components/ui";
import { WorkspaceHeader } from "@/widgets/workspace-header";
import { WorkspaceTabs } from "@/widgets/workspace-tabs";
import { WorkspaceInfo } from "@/widgets/workspace-info";
import { WorkspaceSettings } from "@/widgets/workspace-settings";

export const ProjectWorkspace: React.FC = () => {
    const { activateTab, handleTabChange } = useTabsUrlQuery("tab", "projects");

    return (
        <div>
            <WorkspaceHeader />
            <div className="bg-white pt-2 border-b">
                <div className="_container">
                    <Tabs value={activateTab} onValueChange={handleTabChange}>
                        <WorkspaceTabs />
                        <TabsContent value="general">
                            <WorkspaceInfo />
                        </TabsContent>
                        <TabsContent value="settings">
                            <WorkspaceSettings />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};
