import React, { memo } from "react";
import { Grid } from "react-loader-spinner";

function Loader() {
  return (
    <>
      <Grid
        height="80"
        width="80"
        color="rgb(79, 70, 229) "
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
}
export default memo(Loader);
