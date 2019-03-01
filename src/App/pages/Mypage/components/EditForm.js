import React, { PureComponent } from 'react';
import { SocialEditForm } from './socialForm';
import { PhotoContainer } from './PhotoContainer';
import classnames from 'classnames/bind';
import css from './EditForm.scss';

const cx = classnames.bind(css);
const moduleName = 'EditForm';

export class EditForm extends PureComponent {
  render() {
    const { isVisible, toggleModal } = this.props;
    return (
      <div
        className={isVisible ? cx(`${moduleName}`) : cx(`${moduleName}-none`)}>
        <span className={cx(`${moduleName}-title`)}>social Media</span>
        <span className={cx(`${moduleName}-close`)} onClick={toggleModal}>
          X
        </span>
        <SocialEditForm
          title="Instargram"
          placeholder="input your insta address"
        />
        <SocialEditForm
          title="facebook"
          placeholder="input your facebook address"
        />
        <button> Save </button>
        <PhotoContainer />
      </div>
    );
  }
}
