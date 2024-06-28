import React from "react";
import "./logcard.css";
import PropTypes from "prop-types";
import { Icon, Tooltip } from "@chakra-ui/react";
import { MdInfoOutline } from "react-icons/md";
import { formatDate, linkify } from "../../../utils/commonfunctions";
export const LogCard = ({
  log_type,
  log_message,
  log_description,
  created_at,
}) => {
  return (
    <div>
      <div className="log__card">
        <div className="log__card__top">
          <span className="log__card__type">{log_type}</span>
          <span className="log__card__date">{formatDate(created_at)}</span>
        </div>
        <div className="log__card__body">
          {/* <p>{linkify(log_message)}</p> */}
          <div dangerouslySetInnerHTML={{ __html: linkify(log_message) }} />
        </div>
      </div>
    </div>
  );
};

LogCard.propTypes = {
  log_type: PropTypes.string,
  log_message: PropTypes.string,
  log_description: PropTypes.string,
};
