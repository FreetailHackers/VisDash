import React from 'react';
import HomeButton from './home_button';
import Toggle from './toggle_play';
import InputDropDown from './drop_down';
import LoginButton from './login_button';
import Primary from './primary_button';

export default class TopBar extends React.Component {
    render() {
        return (
            <div id="topbar">
                <div className="topbar-container first-half">
                    <HomeButton/>
                </div>
                <div className="topbar-container last-half">
                    <Toggle/>
                    <InputDropDown/>
                    <Primary/>
                    <LoginButton/>
                </div>
            </div>
        )
    }
}