var table_people = new PouchDB('table_people');

//this is only test
// var doc_item1 = {
// 	_id: '1' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender Harry' ,
// 	people_connection: '1st' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'B' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item2 = {
// 	_id: '2' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender Harry' ,
// 	people_connection: '1st' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'C' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item3 = {
// 	_id: '3' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender Harry' ,
// 	people_connection: '1st' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'A' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item4 = {
// 	_id: '4' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender' ,
// 	people_connection: '2nd' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'Lorem ipsum dolor sit ame' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item5 = {
// 	_id: '5' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender' ,
// 	people_connection: '2nd' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'Lorem ipsum dolor sit ame' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item6 = {
// 	_id: '6' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender' ,
// 	people_connection: '2nd' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'Lorem ipsum dolor sit ame' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item7 = {
// 	_id: '7' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender' ,
// 	people_connection: '1st' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'Lorem ipsum dolor sit ame' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item8 = {
// 	_id: '8' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender' ,
// 	people_connection: '2nd' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'Lorem ipsum dolor sit ame' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item9 = {
// 	_id: '9' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender' ,
// 	people_connection: '3rd+' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'Lorem ipsum dolor sit ame' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item10 = {
// 	_id: '10' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender' ,
// 	people_connection: '3rd+' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'Lorem ipsum dolor sit ame' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item11 = {
// 	_id: '11' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender' ,
// 	people_connection: '3rd+' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'Lorem ipsum dolor sit ame' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item12 = {
// 	_id: '12' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender' ,
// 	people_connection: '3rd+' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'Lorem ipsum dolor sit ame' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };
// var doc_item13 = {
// 	_id: '13' ,
// 	user_id: new Date().toJSON() ,
// 	people_full_name: 'Yair Horowi Gender' ,
// 	people_connection: '3rd+' ,
// 	people_email: 'test@test.com' ,
// 	people_name_first: 'Yair' ,
// 	people_name_middle: 'Horowi' ,
// 	people_name_last: 'Gender' ,
// 	people_title: 'Lorem ipsum dolor sit ame' ,
// 	people_avatar: '' ,
// 	people_picture: '' ,
// 	people_blacklist: false ,
// 	people_company: {
// 		people_company_name: 'test company' ,
// 		people_company_profile: 'https://www.linkedin.com/company/5213720' ,
// 		people_company_website: 'http://www.testcompany.com'
// 	} ,
// 	people_common: 'Common' ,
// 	people_location: 'Singapor' ,
// 	people_industry: 'test industry' ,
// 	people_address: 'Singapor City' ,
// 	people_birthday: '05/26/1992' ,
// 	people_summary: 'summary' ,
// 	people_twitter: '@test' ,
// 	people_phone: {
// 		p_phone_number: '123-456-7890' ,
// 		p_phone_type: 'Cell Phone'
// 	} ,
// 	people_messenger: {
// 		p_messenger_id: 'test-messenger' ,
// 		p_messenger_type: 'test-messenger-type'
// 	} ,
// 	people_website: {
// 		p_people_website_url: 'https://www.test.com'
// 	} ,
// 	people_organization: {
// 		p_organization_name: 'test-organ-name' ,
// 		p_organization_title: 'test-organ-title' ,
// 		p_organization_start: 'test-organ-start' ,
// 		p_organization_end: 'test-organ-end' ,
// 		p_organization_description: 'test-organ-description' ,
// 		p_organization_location: 'test-organ-location'
// 	} ,
// 	people_education: {
// 		p_education_name: 'test-edu-name' ,
// 		p_education_degree: 'test-edu-degree' ,
// 		p_education_FOS: 'test-edu-FOS' ,
// 		p_education_grade: 'test-edu-grade' ,
// 		p_education_start: 'test-edu-start' ,
// 		p_education_end: 'test-edu-end' ,
// 		p_education_description: 'test-edu-description'
// 	} ,
// 	people_skills: {
// 		p_skills_name: 'test-skills-name'
// 	} ,
// 	people_following: {
// 		p_following_name: 'test-following-name'
// 	} ,
// 	people_groups: {
// 		p_groups_name: 'test-groups-name'
// 	} ,
// 	people_visited: {
// 		p_visited_date: 'test-visited-date'
// 	} ,
// 	people_viewed: {
// 		p_viewed_date: 'test-viewed-date'
// 	} ,
// 	people_message: {
// 		p_message_sent_recieved: 'test-message-sent' ,
// 		p_message_content: 'test-message-content'
// 	} ,
// 	people_connection_request: {
// 		sent_received_withdrawn: 'test-received-withdrawn' ,
// 		p_conReq_date: 'test-conReq-date' ,
// 		p_conReq_message: 'test-conReq-message'
// 	} ,
// 	people_interests: {
// 		p_interests_name: 'test-interests-name'
// 	} ,
// 	people_tags: {
// 		p_tag: [ 'Option 1' , 'Option 3' ]
// 	} ,
// 	people_notes: 'test-people-notes' ,
// 	people_automations: {
// 		p_automation_name: []
// 	}
// };

//var docs = [doc_item1, doc_item2, doc_item3, doc_item4, doc_item5, doc_item6, doc_item7, doc_item8, doc_item9, doc_item10, doc_item11, doc_item12, doc_item13];
var docs = [];
var tags = [
	'Option 1' ,
	'Option 2' ,
	'Option 3' ,
	'Option 4' ,
	'Option 5' ,
	'Option 6' ,
	'Option 7' ,
	'Option 8' ];
var automations = [
	'automation 1' ,
	'automation 2' ,
	'automation 3' ,
	'automation 4' ,
	'automation 5' ,
	'automation 6' ,
	'automation 7' ,
	'automation 8' ,
	'automation 9' ];

//main project.
var peopleTableContent = '';
var peopleTable = document.getElementById('peopleTableContent');
var searchBtn = document.getElementById('searchBtn');
var searchTextBox = document.getElementById('searchTextBox');
var showAllBtn = document.getElementById('showAllBtn');
var resultResContent = document.getElementById('resultRes');
var bulkActionSelect = document.getElementById('bulkActionSelect');
var bulkActionBtn = document.getElementById('bulkActionBtn');

var firstCheck = document.getElementById('firstFilter');
var secondCheck = document.getElementById('secondFilter');
var thirdCheck = document.getElementById('thirdFilter');
var blCheck = document.getElementById('blFilter');
var automationsInputDiv = document.getElementById('automationsInputDiv');

var allPeople;
var allPeopleNum;
var selectedPeopleId = [];
var totalPages = 0;
var g_resultList = { rows: [] };
var g_resultListNum;
var currentPageNumber = 1;

var automationListValTmp = [];

var automationId_nameList = {};

//all Data of Automation Data
var allTableAutomationData = {};

// setInterval(
//    function(){

//  searchTextBox.value = '';
//     console.log({doc_item1})
//     drawPeopleTable();
//  resultResContent.innerText = 'All showered ' + allPeople.rows.length + ' people';
//    }, 1000);

//      $( document ).ready(function() {
//     searchTextBox.value = '';
//     // console.log(allPeople)
//     drawPeopleTable(allPeople);
//     //
// });

//get automation's action data from json
var getAutomationDataFromJson = function( automationId ) {
	for (var i = 0; i < allTableAutomationData.rows.length; i++) {
		if ( (allTableAutomationData.rows[ i ].doc._id + '') == automationId ) {
			return allTableAutomationData.rows[ i ].doc;
		}
	}
};

//get automation's name from json
var getAutomationNameFromJson = function( automationId ) {

	for (var i = 0; i < allTableAutomationData.rows.length; i++) {
		if ( (allTableAutomationData.rows[ i ].doc._id + '') == automationId ) {
			return allTableAutomationData.rows[ i ].doc.automation_name;
		}
	}
};

var saveDataToTableQueue = function( doc ) {
	table_people.get(doc.queue_people_id).then(people => {
		console.log(people);
		helper_task.addNewTaskWhenAutomationEveryone(people , people.link).
			then(result => {
				console.log(result);
			});
	});

	table_queue.put(doc).then(function( response ) {
		console.log('Save queue');
		console.log(response);
		table_queue.allDocs({
			include_docs: true
		}).then(function( response ) {

		}).catch(function( err1 ) {
			console.log(err1);
		});
	}).catch(function( err ) {
		console.log(err);
	});
};

var calQueueExeDate = function( delay_time , start_time ) {
	if ( delay_time.indexOf('Minute') >= 0 ) {
		start_time.setMinutes(start_time.getMinutes() +
			parseInt(delay_time.charAt(0)));
	}
	if ( delay_time.indexOf('Hour') >= 0 ) {
		start_time.setHours(start_time.getHours() + parseInt(delay_time.charAt(0)));
	}
	if ( delay_time.indexOf('Day') >= 0 ) {
		start_time.setDate(start_time.getDate() + parseInt(delay_time.charAt(0)));
	}
	if ( delay_time.indexOf('Week') >= 0 ) {
		start_time.setDate(start_time.getDate() + parseInt(delay_time.charAt(0)) *
			7);
	}
	if ( delay_time.indexOf('Month') >= 0 ) {
		start_time.setMonth(start_time.getMonth() + parseInt(delay_time.charAt(0)));
	}
	return start_time;
};

//add data to queue list
var addQueueDataPeople = function( peopleId , peopleAutomations , peopleName ) {
	table_queue.allDocs({
		include_docs: true
	}).then(function( result ) {
		// handle result
		console.log(result.rows.length);
		for (var i = 0; i < peopleAutomations.length; i++) {
			var actionsExistBit = false;
			for (var j = 0; j < result.rows.length; j++) {
				if ( result.rows[ j ].doc.queue_people_id == peopleId ) {
					if ( result.rows[ j ].doc.queue_automation_id ==
						peopleAutomations[ i ] ) {
						actionsExistBit = true;
					}
				}
			}
			if ( actionsExistBit ) {
				continue;
			} else {
				var docs = {};
				var automationDataTmp = getAutomationDataFromJson(
					peopleAutomations[ i ]);
				var tmpDate2 = new Date();
				var tmpDate1;
				for (var j = 0; j < automationDataTmp.automation_triggers.length; j++) {
					for (var k = 0; k <
					automationDataTmp.automation_triggers[ j ].trigger_action.length; k++) {
						docs._id = new Date().toJSON() + '-' + peopleAutomations[ i ] +
							'-' + automationDataTmp.automation_triggers[ j ]._id + '-' +
							automationDataTmp.automation_triggers[ j ].trigger_action[ k ]._id;
						docs.queue_people_id = peopleId;
						docs.queue_people_name = peopleName;
						docs.queue_automation_id = peopleAutomations[ i ];
						docs.queue_action_style = automationDataTmp.automation_triggers[ j ].trigger_action[ k ].action_style;
						docs.queue_task_name = getAutomationNameFromJson(
							peopleAutomations[ i ]);
						docs.queue_action_state = '1';
						tmpDate1 = calQueueExeDate(
							automationDataTmp.automation_triggers[ j ].trigger_action[ k ].action_delay_time ,
							tmpDate2);
						docs.queue_action_start_date = {};
						docs.queue_action_start_date[ 'minutes' ] = tmpDate1.getMinutes();
						docs.queue_action_start_date[ 'hours' ] = tmpDate1.getHours();
						docs.queue_action_start_date[ 'date' ] = tmpDate1.getDate();
						docs.queue_action_start_date[ 'month' ] = tmpDate1.getMonth();
						docs.queue_action_start_date[ 'year' ] = tmpDate1.getYear();
						tmpDate2 = tmpDate1;
						saveDataToTableQueue(docs);
					}
				}
			}
		}

	}).catch(function( err ) {
		console.log(err);
	});

};

//check people when draw table
var checkPeopleFollowArray = function( checkArray ) {
	var checkboxes = document.getElementsByName('individual');
	for (var i = 0 , n = checkboxes.length; i < n; i++) {
		for (var j = 0; j < checkArray.length; j++) {
			if ( checkboxes[ i ].id == checkArray[ j ] ) {
				checkboxes[ i ].checked = true;
			}
		}
	}
};

//draw people table function
var drawPeopleTable = function( peopleData , pageNum ) {
	if ( peopleData ) {

		var firstFilter = document.getElementById('firstFilter').checked
			? '1st'
			: '';
		var secondFilter = document.getElementById('secondFilter').checked
			? '2nd'
			: '';
		var thirdFilter = document.getElementById('thirdFilter').checked
			? '3rd+'
			: '';
		var blFilter = document.getElementById('blFilter').checked;
		var secondFilteredNum = 0;
		var peopleList = peopleData.rows;
		var bulkCheckEnable = 'disabled';
		var pageNum = pageNum || 1;
		g_resultList = { rows: [] };
		var firstItemNum = (pageNum - 1) * 10 + 1;
		var secondItemNum = pageNum * 10;
		var itemNum = 0;
		if ( peopleList.length > 0 ) {
			bulkCheckEnable = '';
		}
		peopleTableContent = '<table class="table largeTable"><thead><tr style="background-color:#f7f7f7"><th><label class="custom-checkbox-item pull-left"><input class="custom-checkbox" type="checkbox" id="bulkCheck" onClick="selectAll(this)" ' +
			bulkCheckEnable +
			'><span class="custom-checkbox-mark" style="border:1px solid black;background-color:white;"></span>';
		peopleTableContent += '</label></th><th style="text-align:center;"><i class="fa fa-user"></i></th><th>Name/Title</th><th>Company/Location</th><th>Common</th><th>Tags</th><th>Automation</th><th></th></tr></thead><tbody>';
		for (var i = 0; i < peopleList.length; i++) {
			if (
				(peopleList[ i ].doc.people_connection == firstFilter) ||
				(peopleList[ i ].doc.people_connection == secondFilter) ||
				(peopleList[ i ].doc.people_connection == thirdFilter)
			) {

				if ( blFilter == true ) {
					itemNum++;
					secondFilteredNum++;
					if ( (itemNum >= firstItemNum) && (itemNum <= secondItemNum) ) {
						//draw Table
						let avatarSkeleton = `<div class="search-result--person">
                                            <div class="search-result__wrapper">
                                            <figure class="search-result__image">
                                                <img src="${peopleList[ i ].doc.people_picture.length >
						0
							? peopleList[ i ].doc.people_picture
							: 'assets/img/ghost-person.svg'}" class="lazy-image loaded">
                                            </figure>
                                            </div>
                                        </div>`;
						peopleTableContent += '<tr><td style="text-align:center;"><label class="custom-checkbox-item pull-left"><input class="custom-checkbox" type="checkbox" name="individual" id="' +
							peopleList[ i ].doc._id +
							'" onClick="selectIndividual(this)"><span class="custom-checkbox-mark" style="border:1px solid black;background-color:white;"></span>';
						peopleTableContent += '</label></td><td style="text-align:center;">' +
							avatarSkeleton +
							'</td><td><div class="cellStyleName text-capitalize"><a href="#" onclick="openProfileInLinkedIn(\'' +
							peopleList[ i ].doc.link + '\')">' +
							peopleList[ i ].doc.people_full_name + ' ' +
							'</a> ' +
							'<span style="color: darkgray; font-weight: lighter"> - ' +
							peopleList[ i ].doc.people_connection + '</span>' +
							'</div><div class="cellStyleName1 text-capitalize">' +
							peopleList[ i ].doc.people_title + '</div></td><td>' +
							peopleList[ i ].doc.people_company.people_company_name || "" +
							'</br>' +
							'<span style="color: darkgray;">' +
							peopleList[ i ].doc.people_location || '' + '</span>';
						peopleTableContent += '</td><td><strong>' +
							peopleList[ i ].doc.noSharedConnections +
							'</strong> connections' +
							'</td><td>' +
							'<div class="controls" onclick="makeSelectBlock()" id="peopleTagList" style="display: none;">' +
							'<select class="tagsSelect" onchange="tagsChange(this,\'' +///
							peopleList[ i ].doc._id +
							'\')" id="tags" multiple style="min-width:200px;">';
						for (var j = 0; j <
						peopleList[ i ].doc.people_tags.p_tag.length; j++) {
							peopleTableContent += '<option style="min-width: inherit" selected>' +
								peopleList[ i ].doc.people_tags.p_tag[ j ] + '</option>';
						}
						if(peopleList[ i ].doc.people_tags.p_tag.length>0){
						$('#peopleTagList')
						}

						peopleTableContent += '</select>' +
							'</div>' +
							'<div class="controls" onclick="toggleClassToTag(this)">' +
							'<button class="btn btn-default btn-sm"><i class="fa fa-plus" aria-hidden="true"></i></button>' +
							'</div>' +
							'</td><td>' +
							'<div class="controls"  style="display: none">' +
							'<select class="automationsSelect" onchange="automationsChange(this,\'' +
							peopleList[ i ].doc._id +

							'\')"  id="automations" multiple style="min-width:300px;">';
						for (var j = 0; j < automationListValTmp.length; j++) {
							var compareSeletTmp = false;
							for (var k = 0; k <
							peopleList[ i ].doc.people_automations.p_automation_name.length; k++) {
								if ( automationListValTmp[ j ] ==
									peopleList[ i ].doc.people_automations.p_automation_name[ k ] ) {
									peopleTableContent += '<option selected value="' +
										automationListValTmp[ j ] + '">' +
										automationId_nameList[ automationListValTmp[ j ] + '' ] +
										'</option>';
									compareSeletTmp = true;
									break;
								}
							}
							if ( !compareSeletTmp ) {
								peopleTableContent += '<option value="' +
									automationListValTmp[ j ] + '">' +
									automationId_nameList[ automationListValTmp[ j ] + '' ] +
									'</option>';
								compareSeletTmp = false;
							}
						}
						peopleTableContent += '</select></div>' +
							'<div class="control" onclick="toggleClassToAutomation(this)">' +
							'<button class="btn btn-default btn-sm"><i class="fa fa-plus" aria-hidden="true"></i>' +
							'</button></div>' +
							'</td>';
						var blacklistTmp = '';
						if ( peopleList[ i ].doc.people_blacklist == true ) {
							blacklistTmp = 'block';
						}
						if ( peopleList[ i ].doc.people_blacklist == false ) {
							blacklistTmp = 'none';
						}
						peopleTableContent += '<td><span class="label label-danger" style="display:' +
							blacklistTmp + '">Blacklisted</span></td>';
						peopleTableContent += '</tr>';
						g_resultList.rows.push(peopleList[ i ]);
					} else {
						g_resultList.rows.push(peopleList[ i ]);
						continue;
					}
				}
				if ( blFilter == false ) {
					if ( peopleList[ i ].doc.people_blacklist === false ) {
						itemNum++;
						secondFilteredNum++;
						if ( (itemNum >= firstItemNum) && (itemNum <= secondItemNum) ) {
							//draw table
							peopleTableContent += '<tr><td style="text-align:center;"><label class="custom-checkbox-item pull-left"><input class="custom-checkbox" type="checkbox" name="individual" id="' +
								peopleList[ i ].doc._id +
								'" onClick="selectIndividual(this)"><span class="custom-checkbox-mark" style="border:1px solid black;background-color:white;"></span>';
							peopleTableContent += '</label></td><td style="text-align:center;"><img src="assets/img/avatar.jpg"></td><td><div class="cellStyleName"><a href="#">' +
								peopleList[ i ].doc.people_full_name + ' ' +
								// peopleList[ i ].doc.people_name_first + ' ' +
								// peopleList[ i ].doc.people_name_middle + ' ' +
								// peopleList[ i ].doc.people_name_last +
								'</a></div><div class="cellStyleName1">' +
								peopleList[ i ].doc.people_title + '</div></td><td>' +
								peopleList[ i ].doc.people_company.people_company_name;
							peopleTableContent += '</td><td>' +
								peopleList[ i ].doc.people_location|| '' + '</td><td>' +
								peopleList[ i ].doc.people_common +
								'</td><td><div class="controls">' +
								'<select class="tagsSelect" onchange="tagsChange(this,\'' +
								peopleList[ i ].doc._id +
								'\')" id="tags" multiple style="min-width:300px;">';
							for (var j = 0; j <
							peopleList[ i ].doc.people_tags.p_tag.length; j++) {
								peopleTableContent += '<option selected>' +
									peopleList[ i ].doc.people_tags.p_tag[ j ] + '</option>';
							}
							peopleTableContent += '</select></div></td><td>' +
								peopleList[ i ].doc.people_connection +
								'</td><td><div class="controls"><select class="automationsSelect" onchange="automationsChange(this,\'' +
								peopleList[ i ].doc._id +
								'\')" id="automations" multiple style="min-width:300px;">';
							for (var j = 0; j < automationListValTmp.length; j++) {
								var compareSeletTmp = false;
								for (var k = 0; k <
								peopleList[ i ].doc.people_automations.p_automation_name.length; k++) {
									if ( automationListValTmp[ k ] ==
										peopleList[ i ].doc.people_automations.p_automation_name[ j ] ) {
										peopleTableContent += '<option selected value="' +
											automationListValTmp[ j ] + '">' +
											automationId_nameList[ automationListValTmp[ j ] + '' ] +
											'</option>';
										compareSeletTmp = true;
										break;
									}
								}
								if ( !compareSeletTmp ) {
									peopleTableContent += '<option value="' +
										automationListValTmp[ j ] + '">' +
										automationId_nameList[ automationListValTmp[ j ] + '' ] +
										'</option>';
									compareSeletTmp = false;
								}
							}
							peopleTableContent += '</select></div></td>';
							var blacklistTmp = '';
							if ( peopleList[ i ].doc.people_blacklist == true ) {
								blacklistTmp = 'block';
							}
							if ( peopleList[ i ].doc.people_blacklist == false ) {
								blacklistTmp = 'none';
							}
							peopleTableContent += '<td><span class="label label-danger" style="display:' +
								blacklistTmp + '">Blacklisted</span></td>';
							peopleTableContent += '</tr>';
							g_resultList.rows.push(peopleList[ i ]);
						} else {
							g_resultList.rows.push(peopleList[ i ]);
							continue;
						}
					}
				}
			}
		}
		peopleTableContent += '</tbody></table>';
		g_resultListNum = secondFilteredNum;
		var resultRes = 'Filtered ' + secondFilteredNum + ' people from ' +
			allPeopleNum + ' total people';
		resultResContent.innerText = resultRes;

		peopleTable.innerHTML = peopleTableContent;
		$('.tagsSelect').select2({
			tags: true ,
			tokenSeparators: [ ',' ]
		});
		$('.automationsSelect').select2();

		checkPeopleFollowArray(selectedPeopleId);
	}
};

// original search function
var searchArray = function( arrayVal , txt ) {
	var arrayLen = arrayVal.length;
	for (var i = 0; i < arrayVal.length; i++) {
		if ( arrayVal[ i ].toLowerCase().indexOf(txt) >= 0 ) {
			return true;
		}
	}
	return false;
};

//adding classes to Tags List
var toggleClassToTag = function( element ) {
	element.style.display = 'none';
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		if ( divs[ i ] == element ) {
			var previous = divs[ i - 1 ];
			previous.style.display = 'block';
			previous.childNodes[ 1 ].style.minWidth = "200px";
		}
	}
};

//adding classes to Automation List
var toggleClassToAutomation = function( element ) {
	console.log(element);
	element.style.display = 'none';
	var divs = document.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++) {
		if ( divs[ i ] == element ) {
			var previous = divs[ i - 1 ];
			previous.style.display = 'block';
			previous.childNodes[ 1 ].style.minWidth = "200px";
		}

	}
};

function onBlurAutomation ( element ) {
	console.log(element);
}

function makeSelectBlock ( e ) {
	console.log(e.parentNodes);
}

//field search function
var searchFieldValule = function( peopleListtmp , fieldNametmp , keyValuetmp ) {
	var res = [];
	var listFields = [
		'title' ,
		'name' ,
		'company' ,
		'location' ,
		'common' ,
		'tags' ,
		'connection values' ,
		'automation' ];
	for (var i = 0; i < peopleListtmp.length; i++) {
		switch (fieldNametmp) {
			case 0:
				if ( peopleListtmp[ i ].doc.people_title.toLowerCase().
						indexOf(keyValuetmp) >= 0 ) {
					res.push(peopleListtmp[ i ]);
				}
				break;
			case 1:
				if ( peopleListtmp[ i ].doc.people_full_name.toLowerCase().
						indexOf(keyValuetmp) >= 0 ) {
					res.push(peopleListtmp[ i ]);
				}
				break;
			case 2:
				if ( peopleListtmp[ i ].doc.people_company.people_company_name.toLowerCase().
						indexOf(keyValuetmp) >= 0 ) {
					res.push(peopleListtmp[ i ]);
				}
				break;
			case 3:
				if ( peopleListtmp[ i ].doc.people_location.toLowerCase().
						indexOf(keyValuetmp) >= 0 ) {
					res.push(peopleListtmp[ i ]);
				}
				break;
			case 4:
				if ( peopleListtmp[ i ].doc.people_common.toLowerCase().
						indexOf(keyValuetmp) >= 0 ) {
					res.push(peopleListtmp[ i ]);
				}
				break;
			case 5:
				if ( searchArray(peopleListtmp[ i ].doc.people_tags.p_tag ,
						keyValuetmp) ) {
					res.push(peopleListtmp[ i ]);
				}
				break;
			case 6:
				if ( peopleListtmp[ i ].doc.people_connection.toLowerCase().
						indexOf(keyValuetmp) >= 0 ) {
					res.push(peopleListtmp[ i ]);
				}
			case 7:
				if ( searchArray(
						peopleListtmp[ i ].doc.people_automations.p_automation_name ,
						keyValuetmp) ) {
					res.push(peopleListtmp[ i ]);
				}
		}
	}
	return res;
};

//main search engine
var searchPeople = function( query , jsonRes ) {
	console.log(query);
	if ( !query ) {
		drawPeopleTable(allPeople , currentPageNumber);
		return false;
	}
	var peopleList = jsonRes.rows;
	var allNum = jsonRes.rows.length;
	var filterNum = 0;
	var listFields = [
		'title' ,
		'name' ,
		'company' ,
		'location' ,
		'common' ,
		'tags' ,
		'connection values' ,
		'automation' ];
	var resultList = { rows: [] };
	var resultRes = '';
	if (
		(query.indexOf('(') >= 0) &&
		(query.indexOf(')') >= 0) &&
		(query.indexOf(':') >= 0) &&
		(query.indexOf('(') < query.indexOf(':')) &&
		(query.indexOf(':') < query.indexOf(')'))
	) {
		//search (Tag:aaa) style
		if ( (query.length - 1) == query.lastIndexOf(')') ||
			(query.lastIndexOf('(') == 0) ) {
			var queryArray = query.split(')');
			for (var i = 0; i < (queryArray.length - 1); i++) {
				if (
					(queryArray[ i ].indexOf('(') >= 0) &&
					(queryArray[ i ].indexOf(':') >= 0) &&
					(queryArray[ i ].indexOf(':') > queryArray[ i ].indexOf('(')) &&
					(queryArray[ i ].length > queryArray[ i ].indexOf(':'))
				) {
					var fieldName = queryArray[ i ].slice(queryArray[ i ].indexOf('(') +
						1 , queryArray[ i ].indexOf(':'));
					var keyValue = queryArray[ i ].slice(queryArray[ i ].indexOf(':') +
						1 , queryArray[ i ].length + 1);
					if ( listFields.indexOf(fieldName) >= 0 ) {
						var fieldSearchRes = searchFieldValule(peopleList ,
							listFields.indexOf(fieldName) , keyValue);
						for (var j = 0; j < fieldSearchRes.length; j++) {
							resultList.rows.push(fieldSearchRes[ j ]);
						}
						filterNum = fieldSearchRes.length;
					} else {
						alert('Please input correct field name.');
						return false;
					}
				}
			}
		} else {
			alert('Please input correct query.');
			return false;
		}
	} else {
		//search plain text
		filterNum = 0;
		for (var i = 0; i < peopleList.length; i++) {
			if (
				(peopleList[ i ].doc.people_title.toLowerCase().indexOf(query) >= 0) ||
				(peopleList[ i ].doc.people_full_name.toLowerCase().indexOf(query) >=
					0) ||
				(peopleList[ i ].doc.people_company.people_company_name.toLowerCase().
					indexOf(query) >= 0) ||
				(peopleList[ i ].doc.people_location.toLowerCase().indexOf(query) >=
					0) ||
				(peopleList[ i ].doc.people_common.toLowerCase().indexOf(query) >= 0) ||
				(peopleList[ i ].doc.people_connection.toLowerCase().indexOf(query) >=
					0) ||
				searchArray(peopleList[ i ].doc.people_tags.p_tag , query) ||
				searchArray(peopleList[ i ].doc.people_automations.p_automation_name ,
					query)
			) {
				resultList.rows.push(peopleList[ i ]);
				filterNum++;
			}
		}
	}

	if ( filterNum == allNum ) {
		resultResContent.innerText = 'All showered ' + allPeople.rows.length +
			' people';
	} else {
		resultRes = 'Filtered ' + filterNum + ' people from ' + allNum +
			' total people';
		resultResContent.innerText = resultRes;
	}
	console.log('hey');
	drawPeopleTable(resultList , currentPageNumber);
	let allPeopleNum = resultList.rows.length;
	totalPages = parseInt(allPeopleNum / 10) + 1;
	makePagination(totalPages);
};

//click bulk check box
var selectAll = function( source ) {
	var checkboxes = document.getElementsByName('individual');
	for (var i = 0 , n = checkboxes.length; i < n; i++) {
		checkboxes[ i ].checked = source.checked;
		selectIndividual(checkboxes[ i ]);
	}
};

//click individual check box
var selectIndividual = function( checkBox ) {
	if ( (checkBox.checked == false) &&
		(document.getElementById('bulkCheck').checked == true) ) {
		document.getElementById('bulkCheck').checked = false;
	}
	if ( checkBox.checked == true ) {
		selectedPeopleId.push(checkBox.id);
		var checkboxes = document.getElementsByName('individual');
		var checkSum = true;
		for (var i = 0 , n = checkboxes.length; i < n; i++) {
			checkSum = checkSum && checkboxes[ i ].checked;
		}
		if ( checkSum ) {
			document.getElementById('bulkCheck').checked = true;
		}
	} else {
		for (var i = 0; i < selectedPeopleId.length; i++) {
			if ( selectedPeopleId[ i ] == checkBox.id ) {
				selectedPeopleId.splice(i , 1);
			}
		}
	}
};

//Bulk Action, Add tags to Selected People
var addTagsToSelectedPeople = function() {
	var selectedTags = getArrayFromSelect(document.getElementById('tagsInput'));
	if ( selectedTags.length > 0 ) {
		for (var i = 0; i < selectedPeopleId.length; i++) {
			table_people.get(selectedPeopleId[ i ]).then(function( doc ) {
				var tagsTmp = doc.people_tags.p_tag.concat(selectedTags).unique();
				return table_people.upsert(doc._id , function( doc_ ) {
					doc_.people_tags.p_tag = tagsTmp;
					return doc_;
				}).then(function( res ) {
					// success, res is {rev: '1-xxx', updated: true, id: 'myDocId'}
					getAllTablePepple().then(function( res ) {
						$('#modal-input-tags').modal('hide');
						bulkActionSelect.selectedIndex = '0';
						allPeople = res;
						searchPeople(searchTextBox.value.toLowerCase() , allPeople);
						resultResContent.innerText = 'All showered ' +
							allPeople.rows.length + ' people';
					}).catch(function( err1 ) {
						console.log(err1);
					});
				}).catch(function( err ) {
					// error
				});
			}).then(function( response ) {
				// handle response
			}).catch(function( err ) {
				console.log(err);
			});
		}
	} else {
		alert('Please input Tag Name for Bulk Action');
		return false;
	}
};

//Bulk Action, Add Blacklist to Selected People
var addBlackListToSelectedPeople = function() {
	for (var i = 0; i < selectedPeopleId.length; i++) {
		table_people.get(selectedPeopleId[ i ]).then(function( doc ) {
			return table_people.upsert(doc._id , function( doc_ ) {
				doc_.people_blacklist = true;
				return doc_;
			}).then(function( res ) {
				// success, res is {rev: '1-xxx', updated: true, id: 'myDocId'}
				getAllTablePepple().then(function( res ) {
					$('#modal-input-blacklist').modal('hide');
					bulkActionSelect.selectedIndex = '0';
					allPeople = res;
					searchPeople(searchTextBox.value.toLowerCase() , allPeople);
					resultResContent.innerText = 'All showered ' + allPeople.rows.length +
						' people';
				}).catch(function( err1 ) {
					console.log(err1);
				});
			}).catch(function( err ) {
				// error
			});
		}).then(function( response ) {
			// handle response
		}).catch(function( err ) {
			console.log(err);
		});
	}
};

//Bulk Action, Add automations to Selected People
var addAutomationsToSelectedPeople = function() {
	var selectedAutomations = getArrayFromSelect(
		document.getElementById('automationsInput'));
	if ( selectedAutomations.length > 0 ) {
		//
		for (var i = 0; i < selectedPeopleId.length; i++) {
			table_people.get(selectedPeopleId[ i ]).then(function( doc ) {
				var automationsTmp = doc.people_automations.p_automation_name.concat(
					selectedAutomations).unique();
				return table_people.upsert(doc._id , function( doc_ ) {
					doc_.people_automations.p_automation_name = automationsTmp;
					return doc_;
				}).then(function( res ) {
					getAllTablePepple().then(function( res ) {
						$('#modal-input-automations').modal('hide');
						bulkActionSelect.selectedIndex = '0';
						allPeople = res;
						searchPeople(searchTextBox.value.toLowerCase() , allPeople);
						resultResContent.innerText = 'All showered ' +
							allPeople.rows.length + ' people';
					}).catch(function( err1 ) {
						console.log(err1);
					});
				}).catch(function( err ) {
					// error
				});
			}).then(function( response ) {
				// handle response
			}).catch(function( err ) {
				console.log(err);
			});
		}
	} else {
		alert('Please input Automation Name for Bulk Action');
		return false;
	}
};

//change event select box in table
var tagsChange = function( dom , idVal ) {
	var resTags = getArrayFromSelect(dom);
	table_people.get(idVal).then(function( doc ) {
		return table_people.upsert(doc._id , function( doc_ ) {
			doc_.people_tags.p_tag = resTags;
			return doc_;
		}).then(function( res ) {
			// success, res is {rev: '1-xxx', updated: true, id: 'myDocId'}
			getAllTablePepple().then(function( res ) {
				allPeople = res;
				// drawPeopleTable(allPeople);
			}).catch(function( err1 ) {
				console.log(err1);
			});
		}).catch(function( err ) {
			// error
		});
	}).then(function( response ) {
		// handle response
	}).catch(function( err ) {
		console.log(err);
	});
};

var automationsChange = function( dom , idVal ) {
	var resAutomations = getArrayFromSelect(dom);
	var peopleName = '';
	table_people.get(idVal).then(function( doc ) {
		peopleName = doc.people_full_name;
		return table_people.upsert(doc._id , function( doc_ ) {
			doc_.people_automations.p_automation_name = resAutomations;
			return doc_;
		}).then(function( res ) {

			//Hide select dropdown menu
			// dom.parentNode.style.display = "none";
			// success, res is {rev: '1-xxx', updated: true, id: 'myDocId'}

			//add data to queue list
			console.log('automation changes');
			addQueueDataPeople(idVal , resAutomations , peopleName);

			getAllTablePepple().then(function( res ) {
				allPeople = res;
				// drawPeopleTable(allPeople);
			}).catch(function( err1 ) {
				console.log(err1);
			});
		}).catch(function( err ) {
			// error
		});
	}).then(function( response ) {
		// handle response
	}).catch(function( err ) {
		console.log(err);
	});
};

var makePagination = function( totalPageNumber ) {
	if ( totalPageNumber < 4 ) {
		viewPageNum = 1;
	} else {
		viewPageNum = 3;
	}
	window.pagObj = $('#pagination').twbsPagination('destroy');
	window.pagObj = $('#pagination').twbsPagination({
		totalPages: totalPageNumber ,
		visiblePages: viewPageNum ,
		onPageClick: function( event , page ) {
			currentPageNumber = page;
			drawPeopleTable(g_resultList , currentPageNumber);
		}
	}).on('page' , function( event , page ) {
		console.info(page + ' (from event listening)');
	});
};

searchBtn.addEventListener('click' , function() {
	searchPeople(searchTextBox.value.toLowerCase() , allPeople);
});

showAllBtn.addEventListener('click' , function() {
	searchTextBox.value = '';
	drawPeopleTable(allPeople);
	let allPeopleNum = allPeople.rows.length;
	totalPages = parseInt(allPeopleNum / 10) + 1;
	makePagination(totalPages);
	resultResContent.innerText = 'All showered ' + allPeople.rows.length +
		' people';
});

bulkActionSelect.addEventListener('change' , function() {
	//detect checked or not
	if ( !document.getElementById('bulkCheck').checked ) {
		var checkboxes = document.getElementsByName('individual');
		var checkSum = false;
		for (var i = 0 , n = checkboxes.length; i < n; i++) {
			checkSum = checkSum || checkboxes[ i ].checked;
		}
		if ( checkSum == false ) {
			alert('Please check for bulk action');
			bulkActionSelect.selectedIndex = '0';
			return false;
		}
	}

	if ( bulkActionSelect.value == 'tags' ) {
		var select = document.getElementById("tagsInput");
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			select.options[ i ].selected = false;
		}
		$('#modal-input-tags').modal('show');
		$('#tagsInput').select2({
			tags: true ,
			tokenSeparators: [ ',' ]
		});
	}
	if ( bulkActionSelect.value == 'automations' ) {
		var automationsInputDivContent = '';
		automationsInputDivContent = '<select id="automationsInput" style="width:100%" multiple>';
		for (var i = 0; i < automationListValTmp.length; i++) {
			automationsInputDivContent += '<option value="' +
				automationListValTmp[ i ] + '">' +
				automationId_nameList[ automationListValTmp[ i ] + '' ] + '</option>';
		}
		automationsInputDivContent += '</select>';
		automationsInputDiv.innerHTML = automationsInputDivContent;
		var select = document.getElementById("automationsInput");
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			select.options[ i ].selected = false;
		}
		$('#modal-input-automations').modal('show');
		$('#automationsInput').select2({
			tags: true ,
			tokenSeparators: [ ',' ]
		});
	}
	if ( bulkActionSelect.value == 'blacklist' ) {
		var checkboxes = document.getElementsByName('individual');
		var checksum = 0;
		for (var i = 0 , n = checkboxes.length; i < n; i++) {
			if ( checkboxes[ i ].checked == true ) {
				checksum++;
			}
		}
		document.getElementById('peopleNum').innerText = checksum;
		$('#modal-input-blacklist').modal('show');
	}
});

//bulk action part
document.getElementById('automationsBulkAction').
	addEventListener('click' , function() {
		addAutomationsToSelectedPeople();
	});

document.getElementById('tagsBulkAction').
	addEventListener('click' , function() {
		addTagsToSelectedPeople();
	});

document.getElementById('blacklistBulkAction').
	addEventListener('click' , function() {
		addBlackListToSelectedPeople();
	});

document.getElementById('tagsBulkCancel').
	addEventListener('click' , function() {
		$('#modal-input-tags').modal('hide');
		bulkActionSelect.selectedIndex = '0';
	});

document.getElementById('automationsBulkCancel').
	addEventListener('click' , function() {
		$('#modal-input-automations').modal('hide');
		bulkActionSelect.selectedIndex = '0';
	});

document.getElementById('blacklistBulkCancel').
	addEventListener('click' , function() {
		$('#modal-input-blacklist').modal('hide');
		bulkActionSelect.selectedIndex = '0';
	});

document.getElementById('tagsBulkClose').addEventListener('click' , function() {
	$('#modal-input-tags').modal('hide');
	bulkActionSelect.selectedIndex = '0';
});

document.getElementById('automationsBulkClose').
	addEventListener('click' , function() {
		$('#modal-input-automations').modal('hide');
		bulkActionSelect.selectedIndex = '0';
	});

document.getElementById('blacklistBulkClose').
	addEventListener('click' , function() {
		$('#modal-input-blacklist').modal('hide');
		bulkActionSelect.selectedIndex = '0';
	});

firstCheck.addEventListener('click' , function() {
	searchPeople(searchTextBox.value.toLowerCase() , allPeople);
	totalPages = parseInt(g_resultList.rows.length / 10) + 1;
	makePagination(totalPages);
});

secondCheck.addEventListener('click' , function() {
	searchPeople(searchTextBox.value.toLowerCase() , allPeople);
	totalPages = parseInt(g_resultList.rows.length / 10) + 1;
	makePagination(totalPages);
});

thirdCheck.addEventListener('click' , function() {
	searchPeople(searchTextBox.value.toLowerCase() , allPeople);
	totalPages = parseInt(g_resultList.rows.length / 10) + 1;
	makePagination(totalPages);
});

blCheck.addEventListener('click' , function() {
	searchPeople(searchTextBox.value.toLowerCase() , allPeople);
	totalPages = parseInt(g_resultList.rows.length / 10) + 1;
	makePagination(totalPages);
});

function openProfileInLinkedIn ( link = null ) {
	if ( link ) {
		link = constants.URL.BASE_URL+link
		helper_people.scrapProfileOfConnection(link).then(result => {
			$('#linkedin').click();
			setTimeout(function() {
				webviewTag.loadURL(link);
			} , 1000);
		});
	}
}

table_automation ? table_automation.allDocs({
	include_docs: true
}).then(function( response ) {

	if ( response.rows.length ) {
		getAllTablePepple().then(( docs ) => {
			response = docs;
		});
	}

	automationListValTmp = [];
	allTableAutomationData = response;
	for (var i = 0; i < response.rows.length; i++) {
		automationListValTmp.push(response.rows[ i ].doc._id);
		automationId_nameList[ response.rows[ i ].doc._id ] = response.rows[ i ].doc.automation_name;
		bulkDataTablePeople(docs).then(function( response ) {
			getAllTablePepple().then(function( res ) {
				allPeople = res;
				drawPeopleTable(allPeople);
				resultResContent.innerText = 'All showered ' + allPeople.rows.length +
					' people';
			}).catch(function( err1 ) {
				console.log(err1.message);
			});
		}).catch(function( err ) {
			console.log(err.message);
		});
	}
}).catch(function( err1 ) {
	console.log(err1);
}) : null;

table_automation ? table_automation.allDocs({
	include_docs: true
}).then(function( response ) {

	if ( !response.rows.length ) {
		getAllTablePepple().then(( docs ) => {
			allPeople = docs;
			g_resultList = allPeople;
			allPeopleNum = g_resultList.rows.length;
			drawPeopleTable(allPeople);
			resultResContent.innerText = 'All showered ' + allPeople.rows.length +
				' people';
			totalPages = parseInt(allPeopleNum / 10) + 1;
			makePagination(totalPages);
		});
	}
	automationListValTmp = [];
	allTableAutomationData = response;
	for (var i = 0; i < response.rows.length; i++) {
		automationListValTmp.push(response.rows[ i ].doc._id);
		automationId_nameList[ response.rows[ i ].doc._id ] = response.rows[ i ].doc.automation_name;
		getAllTablePepple().then(function( res ) {
			console.log(res);
			allPeople = res;
			g_resultList = allPeople;
			allPeopleNum = g_resultList.rows.length;
			drawPeopleTable(allPeople);
			resultResContent.innerText = 'All showered ' + allPeople.rows.length +
				' people';
			totalPages = parseInt(allPeopleNum / 10) + 1;
			makePagination(totalPages);
		}).catch(function( err1 ) {
			console.log(err1);
		});
	}
}).catch(function( err1 ) {
	console.log(err1);
}) : null;