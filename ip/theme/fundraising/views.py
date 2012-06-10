from collective.salesforce.fundraising.fundraising_campaign import ThankYouView as BaseThankYouView
from collective.salesforce.fundraising.fundraising_campaign import ThankYouEmail as BaseThankYouEmail
from collective.salesforce.fundraising.fundraising_campaign import IFundraisingCampaignPage
from ip.theme.fundraising.interfaces import IInnocenceProjectFundraisingTheme
from five import grok

class ThankYouView(BaseThankYouView, grok.View):
    grok.context(IFundraisingCampaignPage)
    grok.require('zope2.View')
    grok.name('thank-you')
    grok.template('thank-you')
    grok.layer(IInnocenceProjectFundraisingTheme)

class ThankYouEmail(BaseThankYouEmail, grok.View):
    grok.context(IFundraisingCampaignPage)
    grok.require('zope2.View')
    grok.name('thank-you-email')
    grok.template('thank-you-email')
    grok.layer(IInnocenceProjectFundraisingTheme)
