import React, { useContext } from "react";
import { version } from "../../../../../package.json";
import { Container, Grid, Typography, Chip } from "@material-ui/core";
import MediaQueryContext, { QUERY } from "../MediaQueryContext";
import { useHistory } from "react-router-dom";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import TabletMacIcon from "@material-ui/icons/TabletMac";
import LaptopIcon from "@material-ui/icons/Laptop";
import HdIcon from "@material-ui/icons/Hd";
import AnnotatedText from "./AnnotatedText";

type TitleProps = {
  classes: Record<string, string>;
};

export default function Title({ classes }: TitleProps) {
  const history = useHistory();
  return (
    <Container className={classes.hc} maxWidth="md">
      <Grid
        className={classes.hcg}
        container
        alignItems="flex-end"
        justify="space-between"
      >
        <Typography variant="h4" onClick={() => history.push("/")}>
          <AnnotatedText supNote={`v${version}`}>{"Type 18 hek"}</AnnotatedText>
        </Typography>
        <MediaChip />
      </Grid>
    </Container>
  );
}

function MediaChip() {
  const { media } = useContext(MediaQueryContext);
  let icon: React.ReactElement;
  switch (media) {
    case QUERY.MOBILE_S:
    case QUERY.MOBILE_M:
    case QUERY.MOBILE_L:
      icon = <SmartphoneIcon />;
      break;
    case QUERY.TABLET:
      icon = <TabletMacIcon />;
      break;
    case QUERY.LAPTOP:
    case QUERY.LAPTOP_L:
      icon = <LaptopIcon />;
      break;
    default:
      icon = <HdIcon />;
  }
  return <Chip label={media} icon={icon} variant="outlined" size="small" />;
}
