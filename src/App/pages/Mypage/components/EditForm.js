import React, { PureComponent } from "react"
import { SocialEditForm } from './SocialForm'
import { PhotoContainer } from './PhotoContainer'
import classnames from "classnames/bind"
import css from "./EditForm.scss"

const cx = classnames.bind(css)
const moduleName = "EditForm"

export class EditForm extends PureComponent {
    
    render() {
        const { isVisible, toggleModal } = this.props;
        return (
            <div className={ (isVisible) ? cx(`${moduleName}`) : cx(`${moduleName}-none`)}>
                <h1 className={cx(`${moduleName}-title`)}>social Media</h1>
                <span onClick={toggleModal}>Close</span>
                <SocialEditForm title="Instargram" placeholder="input your insta address"/>
                <SocialEditForm title="facebook" placeholder="input your facebook address"/>
                <button> Save </button>
                <PhotoContainer />
            </div>
        )
    }
}
