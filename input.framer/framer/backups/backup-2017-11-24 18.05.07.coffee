{Firebase} = require "firebase/firebase"
firebaseRef = new Firebase
	projectID: "microjustice-idp" # ... Database → first part of URL
	secret: "DyVbwYoB3leQftI1OjZIjnMCnqGzwNftrlgBsFKf" # ... Project 

allQuestions = ["questions 1", "question 2", "question 3", "Have you ever?"]

allAnswers = {}

firebaseRef.onChange "/answer", (change) -> 
	if change.hasOwnProperty("counter")
		if typeof allAnswers[change.questionId] == "undefined"
			allAnswers[change.questionId] = {}
		allAnswers[change.questionId][change.optionId] = change
	else 
		allAnswers = change
		
	
	
page = new PageComponent
	width: Screen.width
	height: Screen.height
	scrollVertical: false


for txt, questionId in allQuestions
	
	currentPage = questionPage.copy()
	#currentPage.childrenWithName("questionText").text = t
	page.addPage(currentPage)
	for childLayer in currentPage.children
		childLayer.questionId = questionId
		if childLayer.name == "questionText"
			childLayer.text = txt
		
		for optionName in ["option1", "option2", "option3"]		
			if childLayer.name == optionName
				childLayer.onClick (event, clickedLayer) ->	
					try
						count = allAnswers["MA" + clickedLayer.questionId][clickedLayer.name].counter
					catch
						count = 0
					firebaseRef.put("/answer/MA"+ clickedLayer.questionId + "/" + clickedLayer.name, 
						{counter:count+1,
						questionId: "MA" + clickedLayer.questionId,
						optionId: clickedLayer.name})
					
					clickedLayer.animate
						scale: 1.42
						options:
							time: 0.22
							curve: Spring
		
	