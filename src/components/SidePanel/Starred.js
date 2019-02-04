import React from "react";
import {connect} from "react-redux";
import firebase from "../../firebase";
import {Menu, Icon} from "semantic-ui-react";
//actions
import {setCurrentChannel, setPrivateChannel} from "../../actions";

class Starred extends React.Component {
    state = {
        user: this.props.currentUser,
        usersRef: firebase.database().ref("users"),
        activeChannel: "",
        starredChannels: []
    };

    componentDidMount() {
        if (this.state.user) {
            this.addListeners(this.state.user.uid);
        }
    }

    componentWillUnmount() {
        this.removeListener();
    }

    removeListener = () => this.state.usersRef.child(`${this.state.user.uid}/starred`).off();

    addListeners = userId => {
        this.state.usersRef.child(userId).child("starred").on("child_added", snap => {
            const starredChannel = {id: snap.key, ...snap.val()};
            this.setState({starredChannels: [...this.state.starredChannels, starredChannel]});
        });

        this.state.usersRef.child(userId).child("starred").on("child_removed", snap => {
            const channelToRemove = {id: snap.key, ...snap.val()};
            const filteredChannels = this.state.starredChannels.filter(channel => {
                return channel.id !== channelToRemove.id;
            });

            this.setState({starredChannels: filteredChannels});
        });
    };

    displayChannels = starredChannels => (starredChannels.length > 0 && starredChannels.map(channel => (<Menu.Item
        key={channel.id}
        onClick={() => this.changeChannel(channel)}
        name={channel.name}
        active={channel.id === this.state.activeChannel}
        style={{opacity: 0.7}}
    >
        # {channel.name}
    </Menu.Item>)));

    setActiveChannel = chanel => this.setState({activeChannel: chanel.id});

    changeChannel = channel => {
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
        this.props.setPrivateChannel(false);
    };

    render() {
        const {starredChannels} = this.state;

        return (
            <Menu.Menu className="menu">
                <Menu.Item>
                    <span><Icon name="star"/> STARRED</span>{" "}
                    ({starredChannels.length})
                </Menu.Item>
                {this.displayChannels(starredChannels)}
            </Menu.Menu>
        );
    }
}

export default connect(null, {setCurrentChannel, setPrivateChannel})(Starred);