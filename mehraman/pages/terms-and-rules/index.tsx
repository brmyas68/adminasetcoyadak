import React from 'react'
import { NextPage } from 'next'

import { DesktopTermsAndRules } from 'modules/termsAndRules/view/desktop'
import { MobileTermsAndRules } from 'modules/termsAndRules'
import UseCheckScreen from 'components/custom/useCheckScreen'

const TermsAndRulesPage: NextPage = () => {
  return <UseCheckScreen DesktopComp={<DesktopTermsAndRules />} MobileComp={<MobileTermsAndRules />} />
}

export default TermsAndRulesPage
