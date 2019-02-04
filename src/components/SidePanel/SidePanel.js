import React from "react";
import {Menu} from "semantic-ui-react";
// components
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";
import Starred from "./Starred";

class SidePanel extends React.Component {
    render() {
        let {currentUser, primaryColor} = this.props;

        return (
            <Menu size="large"
                  inverted
                  fixed="left"
                  vertical
                  style={{backgroundColor: primaryColor, fontSize: "1.2rem"}}
            >
                <UserPanel currentUser={currentUser} primaryColor={primaryColor}/>
                <Starred currentUser={currentUser}/>
                <Channels currentUser={currentUser}/>
                <DirectMessages currentUser={currentUser}/>
            </Menu>
        );
    }
}

export default SidePanel;