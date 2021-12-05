import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
};

const ImageAvatars = (props) =>{
    const { classes } = props;
    if (props.avatar !== "Icon") {
        return (
            <div className={classes.row}>
                <Avatar
                    alt="Adelle Charles"
                    src={`http://localhost:4000/${props.avatar}`}
                    className={classNames(classes.avatar, classes.bigAvatar)}
                />
            </div>
        );
    } else {
        if (props.gender === "Male") {
            return (
                <div className={classes.row}>
                    <Avatar
                        alt="Adelle Charles"
                        src="http://localhost:4000/defaultMale.png"
                        className={classNames(classes.avatar, classes.bigAvatar)}
                    />
                </div>
            );
        } else {
            return (
                <div className={classes.row}>
                    <Avatar
                        alt="Adelle Charles"
                        src="http://localhost:4000/defaultFemale.png"
                        className={classNames(classes.avatar, classes.bigAvatar)}
                    />
                </div>
            );
        }
    }
};

ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);
