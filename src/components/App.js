import React from "react";
import {connect} from "react-redux";
import {Grid} from "semantic-ui-react";
import "./App.css";
// components
import ColorPanel from "./ColorPanel/ColorPanel";
import SidePanel from "./SidePanel/SidePanel";
import Messages from "./Messages/Messages";
import MetaPanel from "./MetaPanel/MetaPanel";

const App = ({currentUser, currentChannel, isPrivateChannel, userPosts, primaryColor, secondaryColor}) => (
    <Grid columns="equal"
          className="app"
          style={{backgroundColor: secondaryColor}}
    >
        <ColorPanel
            currentUser={currentUser}
            key={currentUser && currentUser.name}
        />
        <SidePanel currentUser={currentUser}
                   key={currentUser && currentUser.uid}
                   primaryColor={primaryColor}
        />
        <Grid.Column style={{marginLeft: 320}}>
            <Messages currentChannel={currentChannel}
                      key={currentChannel && currentChannel.id}
                      currentUser={currentUser}
                      isPrivateChannel={isPrivateChannel}
            />
        </Grid.Column>
        <Grid.Column width={4}>
            <MetaPanel key={currentChannel && currentChannel.name}
                       currentChannel={currentChannel}
                       userPosts={userPosts}
                       isPrivateChannel={isPrivateChannel}
            />
        </Grid.Column>
    </Grid>
);

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel,
    isPrivateChannel: state.channel.isPrivateChannel,
    userPosts: state.channel.userPosts,
    primaryColor: state.colors.primaryColor,
    secondaryColor: state.colors.secondaryColor,
});

export default connect(mapStateToProps)(App);