import {createMuiTheme} from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple'; import green from
// '@material-ui/core/colors/green';

import tinyColor from "tinycolor2";
const colorPrimary = "#13b3ca";

const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
        primary: {
            main: "#3c5fff",
            light: tinyColor(colorPrimary)
                .lighten()
                .toHexString()
        }
    },
    overrides: {

        MuiDrawer: {
            root: {
                width: '0px !important'
            }
        },
        MuiPaper: {
            root: {
                zIndex : '10000000 !important'
            }
        },
        MuiTypography: {
            root: {
                fontFamily: 'shabnam !important'
            }
        },
        MuiIconButton: {
            root: {
                position: 'absolute',
                top: '50px',
                left: '50px',
                zIndex: '10000 !important'
            }
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 400,
            md: 612,
            lg: 992,
            xl: 1200
        }
    }
});

export default theme;