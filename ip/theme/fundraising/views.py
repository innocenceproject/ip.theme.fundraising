from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile
from collective.salesforce.fundraising.fundraising_campaign import IFundraisingCampaignPage
from collective.salesforce.fundraising.donation import ThankYouView as BaseDonationThankYouView
from collective.salesforce.fundraising.donation import ThankYouEmail as BaseDonationThankYouEmail
from collective.salesforce.fundraising.donation import HonoraryEmail as BaseDonationHonoraryEmail
from collective.salesforce.fundraising.donation import MemorialEmail as BaseDonationMemorialEmail
from collective.salesforce.fundraising.donation import IDonation
from ip.theme.fundraising.interfaces import IInnocenceProjectFundraisingTheme
from five import grok

class DonationThankYouView(BaseDonationThankYouView, grok.View):
    grok.context(IDonation)
    grok.require('zope2.View')
    grok.name('view')
    grok.template('donation-thank-you')
    grok.layer(IInnocenceProjectFundraisingTheme)

class DonationThankYouEmail(BaseDonationThankYouEmail, grok.View):
    grok.context(IDonation)
    grok.require('zope2.View')
    grok.name('thank-you-email')
    grok.layer(IInnocenceProjectFundraisingTheme)
    email_template = ViewPageTemplateFile('views_templates/donation-thank-you-email.pt')

class DonationHonoraryEmail(BaseDonationHonoraryEmail, grok.View):
    grok.context(IDonation)
    grok.require('zope2.View')
    grok.name('honorary-email')
    grok.layer(IInnocenceProjectFundraisingTheme)
    email_template = ViewPageTemplateFile('views_templates/donation-honorary-email.pt')

class DonationMemorialEmail(BaseDonationMemorialEmail, grok.View):
    grok.context(IDonation)
    grok.require('zope2.View')
    grok.name('memorial-email')
    grok.layer(IInnocenceProjectFundraisingTheme)
    email_template = ViewPageTemplateFile('views_templates/donation-memorial-email.pt')
