import React, { Component } from 'react';
import Hls from 'hls.js';
import utils from '../utils/utils';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';
import Button from 'muicss/lib/react/button';

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: true,
            hls: false,
            rerender: false,
        };
    }

    setupPlayer() {
        if (Hls.isSupported()) {
            let beachHls = new Hls();
            beachHls.loadSource(`https://video-auth1.iol.pt/beachcam/${this.props.url}/playlist.m3u8`);
            beachHls.attachMedia(this.refs.video);
            beachHls.on(Hls.Events.MANIFEST_PARSED, () => this.refs.video.play());
            this.setState({hls: beachHls})
        } else {
            this.refs.video.src = `https://video-auth1.iol.pt/beachcam/${this.props.url}/playlist.m3u8`;
            this.refs.video.play();
        }

        this.setState({rerender:false});
    }



    pause() {
        this.setState({play: false});
        this.state.hls.stopLoad()
    }

    play() {
        this.setState({play: true});
        this.state.hls.startLoad(0)
        this.state.hls.on(Hls.Events.MANIFEST_PARSED, () => this.refs.video.play());
    }

    componentDidMount() {
        this.setupPlayer()
    }

    componentWillUpdate() {
        this.refs.video.pause()
    }

    componentDidUpdate() {
       this.setupPlayer()
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.url !== this.props.url;
    }

    render() {

        const footer =
            <div className="player__footer__uncollapsed">
                <Select
                    value={this.props.url}
                    onChange={event => this.props.onClick({index: this.props.index, url: event.target.value})}>
                    {this.props.beachNames.map((beach, key) => <Option key={key} value={beach.url} label={beach.name}/>)}
                </Select>

            </div>;

        const playPause = this.state.play ?
            <Button className="player__toggle-play" variant="fab" color="pimary" onClick={() => this.pause()}><i className="fa fa-pause"></i></Button>
            :
            <Button className="player__toggle-play" variant="fab" color="pimary" onClick={() => this.play()}><i className="fa fa-play"></i></Button>

        return (
            <article className="player">

                <main className="player__content">
                    <Button className="player__delete" variant="fab" color="danger" onClick={() => this.props.deleteCamera({index: this.props.index})}>&times;</Button>
                    <video ref="video" autoPlay controls></video>
                </main>

                <footer className="player__footer">
                    {footer}
                </footer>
            </article>
        );
    }
}

Player.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};
