import React, { PureComponent } from "react"
import { SocialEditForm } from './socialForm'
import classnames from "classnames/bind"
import css from "./EditForm.scss"

const cx = classnames.bind(css)
const moduleName = "EditForm"

export class EditForm extends PureComponent {
    
    render() {
        const { isVisible } = this.props;
        return (
            <div className={ (isVisible) ? cx(`${moduleName}`) : cx(`${moduleName}-none`)}>
                <SocialEditForm title="Instargram" placeholder="input your insta address"/>
                <SocialEditForm title="facebook" placeholder="input your facebook address"/>
            </div>
        )
    }
}
