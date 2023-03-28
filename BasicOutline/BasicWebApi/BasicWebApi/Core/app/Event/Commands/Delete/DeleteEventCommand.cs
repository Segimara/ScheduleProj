using MediatR;

namespace BasicWebApi.Core.App.Event.Commands.Delete
{
	public class DeleteEventCommand : IRequest<Guid>
	{
		public Guid Id { get; set; }
		public Guid UserId { get; set; }
	}
}
