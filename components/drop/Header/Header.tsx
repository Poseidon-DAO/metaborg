import { Button, Grid, Title } from "@mantine/core";

import { ConnectWallet } from "components/drop/ConnectWallet";

import { NextPage } from "next";

const Header: NextPage = () => {
  return (
    <Grid align="center" justify="space-between">
      <Grid.Col span={4}>
        <Title order={1}>Metaborg</Title>
      </Grid.Col>

      <Grid.Col
        span={4}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <ConnectWallet />
      </Grid.Col>
    </Grid>
  );
};

export { Header };
