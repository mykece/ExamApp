﻿using BAExamApp.Core.Enums;

namespace BAExamApp.Dtos.Candidate.CandidateQuestionAnswers;
public class CandidateAnswerUpdateDto
{
    public Guid Id { get; set; }
    public string Answer { get; set; } 
    public bool IsImageAnswer { get; set; }
    public bool IsRightAnswer { get; set; }
    public Guid QuestionId { get; set; }
    public Status Status { get; set; }
}
