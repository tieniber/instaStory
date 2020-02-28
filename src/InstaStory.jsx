import { Component, Fragment, createElement } from "react";
import { Dimensions, TouchableWithoutFeedback, View } from "react-native";
import Modal from "react-native-modalbox";
import Stories from "./components/stories/view/storiesView";

const modalStyle = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    flex: 1,
    marginTop: 25
};

export class InstaStory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
    }

    render() {
        const { isModalOpen /*, orderedStories, selectedStory */ } = this.state;
        const children = [];
        if (this.props.storysource.status !== "loading") {
            this.props.storysource.items.forEach(child => children.push(this.props.stories(child)));
        }
        return (
            <Fragment>
                <TouchableWithoutFeedback onPress={() => this._openModal()}>
                    <View>{this.props.content}</View>
                </TouchableWithoutFeedback>
                <Modal
                    /*isVisible={isModalOpen}
                    onSwipeComplete={() => this._closeModal()}
                    swipeDirection="down"
                    backdropOpacity={0.3}*/
                    backdropOpacity={0.3}
                    style={modalStyle}
                    isOpen={isModalOpen}
                    onClosed={() => this.setState({ isModalOpen: false })}
                    position="bottom"
                    swipeToClose
                    swipeArea={250}
                    backButtonClose
                    coverScreen={true}
                    useNativeDriver={false}
                >
                    <Stories stories={children}></Stories>
                </Modal>
            </Fragment>
        );
    }

    _openModal() {
        this.setState({
            isModalOpen: true
        });
    }
    _closeModal() {
        this.setState({
            isModalOpen: false
        });
    }
}
