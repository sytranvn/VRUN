
from uuid import uuid4
from app.models import Answer, Exam, ExamStatus, Part, Question, QuestionGroup, Skill


def create_multiple_choice(session, exam, num_part: int, skill: Skill, description: str):
    for order in range(num_part):
        question_group = QuestionGroup(
            description=description,
            resource="dummy.mp3",
            skill=skill,
            duration=60,
        )
        session.add(question_group)
        session.commit()
        session.refresh(question_group)
        questions = []
        for i in range(4):
            question = Question(
                question_group_id=question_group.id,
                description=f"{i}. How many people could be facing “near-unlivable” heat in 50 years?",
            )
            questions.append(question)

        session.add_all(questions)
        session.commit()
        for q in questions:
            session.refresh(q)
            answers = [Answer(
                question_id=q.id,
                description="3 million",
                is_correct_answer=False
            ),
                Answer(
                question_id=q.id,
                description="5 million",
                is_correct_answer=False
            ),
                Answer(
                question_id=q.id,
                description="3.5 million",
                is_correct_answer=False
            ),
                Answer(
                question_id=q.id,
                description="6 million",
                is_correct_answer=True
            )]
            session.add_all(answers)
            session.commit()
        session.refresh(question_group)

        exam.parts.append(
            Part(question_group_id=question_group.id,
                 order=order,
                 exam_id=exam.id))


def insert_seed_data(session):
    exam = Exam(
        title="Enlish testing",
        description="This is a sample exam"
    )
    session.add(exam)
    session.commit()
    session.refresh(exam)

    # NOTE: Listening
    create_multiple_choice(session, exam, 3, Skill.LISTENING, 
        """<b>Directions:</b> In this section of the test, you will have an opportunity to demonstrate your ability to understand conversations and talks in English. There are three parts in this section with special directions for each part. Answer all the questions on the basis of what is stated or implied by the speakers in the recording. There will be time for you to read the questions and check your work. All the recordings will be played ONCE only.<br><br><b>Directions:</b> In this part, you will hear EIGHT short announcements or instructions. There is one question for each announcement or instruction. For each question, choose the correct answer A, B, C or D.<br><i>Now, let's listen to an example. In the recording, you will hear:</i><br><b>Woman:</b> Hello. This is the travel agency returning your call. You left a message about the holiday you’ve booked, asking which meals are included in the cost during your stay at Sunny Hotel. Lunch and dinner are free but if you wish to have breakfast in the hotel, you will need to pay an extra amount of money, depending on what you order. Let me know if I can help you with any other information. Goodbye.<br><i>On the screen, you will read:</i><br>Which meal is NOT included in the price of the holiday?<br>A. Breakfast<br>B. Lunch<br>C. Dinner<br>D. All<br><i>The correct answer is A. Breakfast. <br>We are ready to start. First, you have some time to look at questions 1 to 8.</i>""",  # noqa
    )

    create_multiple_choice(session, exam, 4, Skill.READING,
        """<b>PASSAGE {order} - Questions 1-10</b><br><i>Have you ever wanted to quit your job and do something of your own, but never got around because “what if…”? Here are the four heroes in India who actually did it. </i><br><br><b>Abhishek</b><br>Even though he was performing well working for a big company, Abhishek had the strong feelings of uncertainty and dissatisfaction with his job. He realised that sports events and endurance activities were something he enjoyed since his school days. Although it was a tough decision to leave a well-paying and secure job, Abhishek decided it was passion before profession. He quit the job in 2014 to take up long distance running more seriously. He is training for Ironman, one of the most gruelling sports events on earth, and will be representing India in Mallorca, Spain.<br><br><b>Priti</b><br>Priti worked as a copywriter.  However, nature had always been a big part of her life. During her last job as a content writer in Mumbai, she happened to meet GreenSouls – a small group experimenting with organic farming in cramped urban spaces, and realized it was something that spoke to her. She quit her job and started to visit and volunteer at their farms often. Today, the group has four farms in the city that feed destitute children who are also cancer patients. “When I’m on the farm, I’m not just at work, I’m in school, at a party and at work!” she says.<br><br><b>Divya</b><br>Back in college, Divya used to write poems and had published a few on Facebook, which won praise from many Facebook readers. In the real world, Divya worked in a digital agency and in social media. After a few months though, Divya knew that this was not worth the stress and the routine and the job barely left her with any time to focus on her passion. She subsequently decided to quit to focus full time on writing. “No matter how clumsy I am otherwise, my parents love the fact that I am following my passion. To see them happy obviously makes me happy!” she says.<br><br><b>Gloria</b><br>Gloria joined Google immediately after graduation, and lived a comfortable life with perks and international trips. In 2006, Gloria and a few friends went to a child shelter in Cochin. This visit gave them an insight into the poor education provided to street children and children from orphanages. They decided to take matters into their own hands and started an organization called Make-A-Difference (MAD) to educate a larger group of children. Gloria quit her job to <b>further</b> the charity’s aims full time.  Currently with 23 chapters, MAD teaches across 85 shelter homes and over 4,500 street children with the help of 2,300 teacher volunteers all over India.""",  # noqa
    )

    # NOTE: Writing
    for order in range(2):
        question_group = QuestionGroup(
            description=f"""
                <b>Task {order}:</b> You should spend about 20 minutes on this task. <br>You are part of an organizing committee for an upcoming literary event. You've invited a renowned author, Ms. Emily Parker, to be a keynote speaker at your event. Read part of the letter from her below. <br><br><i><em> I'm really excited to be the main speaker at your event.<br></em><br><em>I want to make sure my talk is interesting, so could you tell me what the audience likes? I'm thinking about talking about my life as a writer or maybe some big ideas in today's books.<br></em><br><em>Also, I'll be at Hotel 88 in the city center. Can you tell me where the event is and how to get there from the hotel? This will help me plan my trip.<br></em><br><em>Looking forward to meeting you soon.</em></i><em><br><br></em>""",  # noqa
            resource=None,
            skill=Skill.WRITING,
            duration=60,
        )
        session.add(question_group)
        session.commit()
        for i in range(2):
            question = Question(
                question_group_id=question_group.id,
                description=f"{i}. Write a letter responding to Ms. Emily Parker. You should write at least 120 words. You are not allowed to include your name.",
            )
            session.add(question)
        session.commit()
        session.refresh(question_group)
        exam.parts.append(
            Part(question_group_id=question_group.id,
                 order=order,
                 exam_id=exam.id))

    # NOTE: Speaking
    for order in range(2):
        question_group = QuestionGroup(
            description=f"""
                <b>Part {order}: Social Interaction (3’)</b><br>Now, the test begins. Let’s talk about reading.<br>""",  # noqa
            resource=None,
            skill=Skill.SPEAKING,
            duration=60,
        )
        session.add(question_group)
        session.commit()
        session.add(Question(
            question_group_id=question_group.id,
            description="<i>- <em>Do you enjoy reading? Why?<br>- What sort of things do you read? <br>- What are the advantages of reading?</em></i><em><br><br></em>",
        ))
        session.add(Question(
            id=uuid4(),
            question_group_id=question_group.id,
            description="Now, let’s talk about your neighbourhood.<i><br>- <em>What do you like about the area where you live?<br>- How do you think it could be improved?<br>- Do you think it is better to live in the centre of town or outside in the country? Why?</em></i>",
        ))
        session.commit()

        session.add(question_group)
        session.add_all(question_group.questions)
        session.commit()
        session.refresh(question_group)
        exam.parts.append(
            Part(question_group_id=question_group.id,
                 order=order,
                 exam_id=exam.id))

    exam.status = ExamStatus.ACTIVE
    session.commit()
    session.refresh(exam)


