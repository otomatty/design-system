import { Tabs, TabList, Tab, TabPanel, Text } from "@otomatty/design-system";

const F = ({ children }: { children: any }) => (
  <div className="ds-root" style={{ padding: 24, width: 420, maxWidth: "100%" }}>{children}</div>
);

export const Underline = () => (
  <F>
    <Tabs defaultValue="overview">
      <TabList>
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanel value="overview"><Text size="body-sm" tone="muted">Project overview and key metrics.</Text></TabPanel>
      <TabPanel value="activity"><Text size="body-sm" tone="muted">Recent activity feed.</Text></TabPanel>
      <TabPanel value="settings"><Text size="body-sm" tone="muted">Workspace settings.</Text></TabPanel>
    </Tabs>
  </F>
);

export const Pill = () => (
  <F>
    <Tabs defaultValue="month" variant="pill">
      <TabList>
        <Tab value="month">Monthly</Tab>
        <Tab value="year">Annual</Tab>
      </TabList>
      <TabPanel value="month"><Text size="body-sm" tone="muted">Billed every month.</Text></TabPanel>
      <TabPanel value="year"><Text size="body-sm" tone="muted">Billed once a year — save 20%.</Text></TabPanel>
    </Tabs>
  </F>
);
