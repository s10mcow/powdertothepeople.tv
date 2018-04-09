import React, { Component } from 'react';
import Player from './Player';
import Button from 'muicss/lib/react/button';

export default class PlayersContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const players = this.props.cameras.length === 1 ? 'players players--single' : 'players';

        return (
            <div className="players__wrapper">
                <section className={players}>
                    {this.props.cameras.map((camera, index) =>
                        <Player
                            key={index}
                            index={index}
                            name={camera.name}
                            url={camera.url}
                            beachNames={this.props.beachNames}
                            deleteCamera={this.props.deleteCamera}
                            onClick={this.props.onClick}/>
                    )}
                </section>
                <Button color="primary" onClick={this.props.addNewCamera}>Add Camera</Button>

                <div id="wg_target_div_512670_72189470"></div>
            </div>
    );
    }
}
