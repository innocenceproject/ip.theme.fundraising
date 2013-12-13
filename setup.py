from setuptools import setup, find_packages
import os

version = '1.1'

setup(name='ip.theme.fundraising',
      version=version,
      description="Innocence Project Fundraising Theme",
      long_description=open("README.txt").read() + "\n" +
                       open(os.path.join("docs", "HISTORY.txt")).read(),
      # Get more strings from
      # http://pypi.python.org/pypi?:action=list_classifiers
      classifiers=[
        "Framework :: Plone",
        "Programming Language :: Python",
        ],
      keywords='',
      author='Jason Lantz (Innocence Project, Inc)',
      author_email='jlantz@innocenceproject.org',
      url='http://github.com/innocenceproject/ip.theme.fundraising/',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['ip', 'ip.theme'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          'plone.resource',
          'plone.app.theming',
          'z3c.jbot',
      ],
      entry_points="""
      # -*- Entry points: -*-

      [z3c.autoinclude.plugin]
      target = plone
      """,
      )
