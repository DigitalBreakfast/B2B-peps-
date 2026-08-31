/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import PartnerWithUs from "./PartnerWithUs";

interface WhyPartnerProps {
  onContactClick: () => void;
  onNavigate?: (pageId: string, filterCategory?: string) => void;
}

export default function WhyPartner({ onContactClick, onNavigate }: WhyPartnerProps) {
  return (
    <PartnerWithUs
      onNavigate={(pageId) => {
        if (onNavigate) {
          onNavigate(pageId);
        }
      }}
      onContactClick={onContactClick}
    />
  );
}
