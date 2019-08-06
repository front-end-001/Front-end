<script>
import Piece from "./Piece";
export default {
  functional: true,
  render(h, context) {
    const { props } = context;
    return (
      <div class="board">
        {props.cells.map((color, pos) => (
          <Piece
            key={pos}
            color={color}
            onClick={() => props.cellClick && props.cellClick(pos)}
          />
        ))}
      </div>
    );
  }
};
</script>

<style scoped>
.board {
  font-size: 32px;
  width: 8em;
  height: 8em;
  margin: 20px auto;
}
</style>
