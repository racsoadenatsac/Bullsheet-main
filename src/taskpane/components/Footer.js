import * as React from "react";

import { TooltipHost } from 'office-ui-fabric-react/lib/Tooltip';

export default function Footer() {

  return (
    <div className="footer">
      <div className="how-to">
        <TooltipHost content="Upload a CSV file. Click on Run Results." hostClassName="how-to">
          <img src="https://static.wixstatic.com/media/8caea9_377dcdc7020044f69b958b6a3394aa18~mv2.png" alt="Sparksheet Inc"></img>
          <span>Tell me how</span>
        </TooltipHost>
      </div>
      <div className="copyright">
        <div>Bullsheet, 2021. All rights reserved.</div>
        <a href="https://www.bullsheet.ai">https://bullsheet.ai</a>
      </div>
    </div>
  );
}