﻿using BAExamApp.Dtos.ApiDtos.SubjectApiDtos;
using BAExamApp.Dtos.Subjects;

namespace BAExamApp.Business.Profiles;

public class SubjectProfile : Profile
{
    public SubjectProfile()
    {
        CreateMap<SubjectCreateDto, Subject>()
            .ForMember(dest => dest.Name,
            config => config.MapFrom(src => src.Name.Trim()));

        CreateMap<Subject, SubjectDto>();
        CreateMap<Subject, SubjectListDto>();
        CreateMap<Subject, SubjectDetailDto>();
        CreateMap<SubjectUpdateDto, Subject>();
        CreateMap<Subject,SubjectApiDto >();
        CreateMap<Subject, SubjectApiDto >();
        CreateMap<SubjectUpdateApiDto, Subject>();
        CreateMap<Subject, SubjectApiDto>();
    }
}