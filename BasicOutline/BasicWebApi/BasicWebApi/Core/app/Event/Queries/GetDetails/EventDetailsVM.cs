using AutoMapper;
using BasicWebApi.Core.App.Common.Mapping;
using BasicWebApi.Core.Domain;

namespace BasicWebApi.Core.App.Event.Queries.GetDetails
{
    public class EventDetailsVM : IMapWith<EventModel>
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        //public List<ImageModel> Images { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<EventModel, EventDetailsVM>();
        }
    }
}
