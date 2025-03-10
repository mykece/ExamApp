﻿using BAExamApp.Dtos.ProductSubjects;
using BAExamApp.Entities.DbSets;

namespace BAExamApp.Dtos.Subjects;

public class SubjectCreateDto
{
    public string Name { get; set; }
    public virtual List<Subtopic>? Subtopics { get; set; } = new List<Subtopic>();
    public virtual List<ProductSubjectDto> ProductSubjects { get; set; } = new List<ProductSubjectDto>();

}