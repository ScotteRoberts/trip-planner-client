import React from 'react';
import './DetailPanel.css';

const DetailPanel = props => (
  <aside className="detail-panel">{props.children}</aside>
);

export default DetailPanel;
