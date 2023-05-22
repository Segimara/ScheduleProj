using BasicWebApi.Core.Domain;
using MediatR;

namespace BasicWebApi.Core.App.Event.Commands.Create
{
    public class CreateEventCommand : IRequest<EventModel>
    {
        public Guid UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        //public TypeOfEvent Type { get; set; }
        public int Priority { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }

    }
}
